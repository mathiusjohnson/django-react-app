import React, { useContext } from 'react';
import { useMutation } from 'urql';
import Button from '@material-ui/core/Button';
import ShowAddress from './ShowAddress';
import { LocationContext } from '../../../context/index';

const DELETE_PERSON_QUERY = `
mutation($id: ID!) {
        deletePerson(id: $id) {
             deletedId
   }
}
`
const ShowPerson = ({personState, addressOne, addressTwo, onEditClicked, refresh}) => {
    const { currentLocation } = useContext(LocationContext);

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

    const editButtonText = currentLocation === '/home' ? 'Edit from Home' : currentLocation === '/about' ? 'Edit from about' : 'Edit from Contact'

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
                    <Button onClick={() => onEditClicked()} variant="contained" color="default"
                    className="edit">
                        {editButtonText}
                    </Button>
                    <Button onClick={() => onDeleteClicked()} variant="contained" color="secondary">
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ShowPerson;