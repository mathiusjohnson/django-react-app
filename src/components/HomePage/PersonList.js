import { Button } from '@material-ui/core';
import { useQuery } from 'urql';
import useVisualMode from '../../hooks/useVisualMode'
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

  const [result, reexecuteQuery] = useQuery({
    query: AllPersonsQuery
  });

  const { data, fetching, error } = result;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  const refresh = () => {
    // Refetch the query and skip the cache
    reexecuteQuery({ requestPolicy: 'network-only' });
  };

  const renderedPersons = data.allPersons.map((person, index) => {
    return (
      <li key={index}>
        <PersonListItem refresh={refresh} person={person} />
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
        <div className="my-4">
          <Button onClick={() => onCreateClicked()} variant="contained" color="primary">
            Add New Person
          </Button>
        </div>
      )}

      {mode === 'CREATE' && (
        <CreatePerson back={back} />
      )}
      
    </div>
  );
};