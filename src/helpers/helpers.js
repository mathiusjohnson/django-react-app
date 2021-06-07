import React, { useState } from 'react';
import { useMutation } from 'urql';


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
export function SendUpdatePerson(newName, newAge, personId, transition, updatePersonState) {
    const [updatePersonResult, updatePerson] = useMutation(UPDATE_PERSON_QUERY);

    const id = personId
    const variables = { id, name: newName || '', age: newAge || '' };

    transition(SAVING);
    updatePerson(variables)
        .then(result => {
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