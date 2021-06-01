import { Button } from '@material-ui/core';
import { useQuery } from 'urql';
import useVisualMode from '../hooks/useVisualMode'
import CreatePerson from './CreatePerson';
import PersonListItem from './PersonListItem/index';


const SHOW = "SHOW";
const CREATE = "CREATE";

const AllPersonsQuery = `
query{
  allPersons{
    id
    name
    age
    addressOne{
      street
      city
      region
      country
      postalCode
    }
    # addressTwo
    addressTwo{
      street
      city
      region
      country
      postalCode
    }  
  }
}
`;

export const People = () => {
  const { mode, transition, back } = useVisualMode(SHOW);

  const [result, _] = useQuery({
    query: AllPersonsQuery
  });

  const { data, fetching, error } = result;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  const renderedPersons = data.allPersons.map((person, index) => {
    return (
      <li>
        <PersonListItem key={index} person={person} />
      </li>
    )
  })

  const onCreateClicked = () => {
    transition(CREATE)
  }

  return (
    <div>
      
      <ul>
        {renderedPersons}
      </ul>

      {mode === 'SHOW' && (
        <Button onClick={() => onCreateClicked()} variant="contained" color="primary">
          Add New Person
        </Button>
      )}

      {mode === 'CREATE' && (
        <CreatePerson back={back} />
      )}
      
    </div>
  );
};