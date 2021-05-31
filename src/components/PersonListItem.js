import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import useVisualMode from '../hooks/useVisualMode'
import { useMutation } from 'urql';
import Status from "./Status";
import EditPerson from './EditPerson';

// const EMPTY = "EMPTY";
const SHOW = "SHOW";
// const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
// const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";

const updatePersonQuery = `
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
    const [updatePersonResult, updatePerson] = useMutation(updatePersonQuery);


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

    return (
        <div>

            {mode === SAVING && <Status message="Saving" />}

            {mode === DELETING && <Status message="Deleting..." />}

            {mode === 'SHOW' && (
                <div className="grid grid-cols-2 justify-between items-center m-2">
                    <div className="flex justify-between">
                    <p>{personState.name}</p>
                    <span>{personState.age}</span>
                    </div>
                    <div>
                    <Button onClick={() => onEditClicked()} variant="contained" color="primary">
                        Edit
                    </Button>
                    </div>
                </div>
            )}

            {mode === 'EDIT' && (
                <EditPerson
                    id={person.id}
                    onCancel={back}
                    onSave={save}
                    oldName={person.name}
                    oldAge={person.age}
                />
            )}
        </div>
    );
};

export default PersonListItem;