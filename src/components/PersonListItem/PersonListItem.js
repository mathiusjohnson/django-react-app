import React, { useState } from 'react';
import useVisualMode from '../../hooks/useVisualMode'
import { useMutation } from 'urql';
import Status from "./Status";
import EditPerson from './EditPerson';
import ShowPerson from './ShowPerson';

const SHOW = "SHOW";
const SAVING = "SAVING";
const DELETING = "DELETING";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";

const UPDATE_PERSON_QUERY = `
mutation ($id: ID!, $name: String!, $age: Int!) {
    updatePerson (personData: {id: $id, name: $name, age: $age }) {
        person {
            name
            age
        }
    }
}
`

const PersonListItem = ({person}) => {
    const { mode, transition, back } = useVisualMode(SHOW);
    const [personState, updatePersonState] = useState(person)
    const [updatePersonResult, updatePerson] = useMutation(UPDATE_PERSON_QUERY);


    const onEditClicked = () => {
        transition(EDIT)
    }

    function save(newName, newAge) {
        const id = person.id
        const variables = { id, name: newName || '', age: newAge || '' };

        transition(SAVING);
        updatePerson(variables)
            .then(result => {
                console.log(result);
                if (result.error) {
                    console.error('Oh no!', result.error);
                } else {
                    const updatedPerson = result.data.updatePerson.person
                    updatePersonState(updatedPerson)
                }
            })
            .then(() => transition(SHOW))
            .catch((error) =>{
                transition(ERROR_SAVE, true);
            }) 
    }

    console.log(personState, person);
    if (!updatePersonResult.fetching) {
        return (
            <div>
    
                {mode === SAVING && <Status message="Saving" />}
    
                {mode === DELETING && <Status message="Deleting..." />}
    
                {mode === 'SHOW' && (
                    <ShowPerson personState={personState} onEditClicked={onEditClicked} addressOne={person.addressOne} addressTwo={person.addressTwo} />
                )}
    
                {mode === 'EDIT' && (
                    <EditPerson
                        id={person.id}
                        onCancel={back}
                        onSave={save}
                        oldName={personState.name}
                        oldAge={personState.age}
                        addressOne={person.addressOne}
                        addressTwo={person.addressTwo}
                    />
                )}
            </div>
        );
    } else {
        return (
            <div>Updating User...</div>
        )
    }
};

export default PersonListItem;