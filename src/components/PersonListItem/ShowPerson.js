import React from 'react';
import { useMutation } from 'urql';
import Button from '@material-ui/core/Button';
import ShowAddress from './ShowAddress';

const DELETE_PERSON_QUERY = `
mutation($id: ID!) {
        deletePerson(id: $id) {
             deletedId
   }
}
`
const ShowPerson = ({personState, addressOne, addressTwo, onEditClicked, refresh}) => {
    const [deletePersonResult, deletePerson] = useMutation(DELETE_PERSON_QUERY);

    const onDeleteClicked = () => {
        // console.log('delete clicked!!!');
        const variables = { id: personState.id }
        deletePerson(variables)
            .then(result => {
                if (result.error) {
                    console.error('Oh no!', result.error);
                } else {
                    refresh()
                }
            })
    }

    return (
        <div className="grid grid-cols-5 items-center m-2">
            <p>{personState.name}</p>
            <span>{personState.age}</span>
            <ShowAddress address={personState.addressOne} />
            {/* {addressTwo ?  */}
            <ShowAddress address={personState.addressTwo} />
                {/* : "" */}
            {/* } */}
            <div>
                <div className="flex space-x-2">
                    <button onClick={() => onEditClicked()} variant="contained" color="default"
                    className="edit">
                        Edit
                    </button>
                    <Button onClick={() => onDeleteClicked()} variant="contained" color="secondary">
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ShowPerson;