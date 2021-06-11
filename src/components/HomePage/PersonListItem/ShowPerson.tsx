import React, { useContext } from 'react';
import { useMutation } from 'urql';
import Button from '@material-ui/core/Button';
import ShowAddress from './ShowAddress';
import { LocationContext } from '../../../context/index';
import { useAuthState } from '../../../context/UserContext/index' 
import { iPerson } from '../../../shared/interfaces/people.interface';

const DELETE_PERSON_QUERY = `
mutation($id: ID!) {
        deletePerson(id: $id) {
             deletedId
   }
}
`
interface iShowPersonProps {
  personState: iPerson;
  onEditClicked: () => void;
  refresh: () => void;
}

const ShowPerson: React.FC<iShowPersonProps> = ({personState, onEditClicked, refresh}) => {
    const { _, editButtonText } = useContext(LocationContext);

    const userDetails = useAuthState() //read user details from context
  console.log(personState);
  
    const [_2, deletePerson] = useMutation(DELETE_PERSON_QUERY);

    const onDeleteClicked = () => {
      
      const variables = { id: personState.id }
      console.log(variables);
        deletePerson(variables)
            .then(result => {
                if (result.error) {
                    console.error('Oh no!', result.error);
                } else {
                    refresh()
                }
            })
    }

    const isLoggedIn = userDetails.email.length > 0 ? true : false
    const isLoggedInEditButtonText = isLoggedIn ? editButtonText + ' Logged In' : editButtonText

    return (
        <div className="grid grid-cols-5 items-center m-2">
            <p>{personState.name}</p>
            <span>{personState.age}</span>
            <ShowAddress address={personState.addressOne} />
            {/* {addressTwo ?  */}
            {personState.addressTwo !== null ? 
              <ShowAddress address={personState.addressTwo} />
            : <div></div>
            }
                {/* : "" */}
            {/* } */}
            <div>
                <div className="flex space-x-2">
                    <Button onClick={() => onEditClicked()} variant="contained" color="default"
                    className="edit">
                        {isLoggedInEditButtonText}
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