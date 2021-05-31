import React from 'react';
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

const PersonListItem = ({person}) => {
    const { mode, transition, back } = useVisualMode(SHOW);
    const updatePersonQuery = `
    mutation ($id: ID!, $name: String!, $age: Number!) {
        updatePerson (id: $id, name: $name, age: $age) {
            id
            name
            age
        }
    }
    `
    const [updatePersonResult, updatePerson] = useMutation(updatePersonQuery);


    const onEditClicked = () => {
        transition(EDIT)
    }

    function save(name, age) {

        const id = person.id
    
        const updatedperson = {
            id,
            name,
            age,
        }
    
        transition(SAVING);
            updatePerson(updatedperson)
                .then(result => {
                    console.log(result);
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
                    <p>{person.name}</p>
                    <span>{person.age}</span>
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