import { useQuery } from 'urql';
import PersonListItem from './PersonListItem';

const AllPersonsQuery = `
  query {
    allPersons {
      id
      name
      age
    }
  }
`;

export const People = () => {
  const [result, reexecuteQuery] = useQuery({
    query: AllPersonsQuery,
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
  return (
    <div>
      <div className="grid grid-cols-2 m-2">
        <div className="flex justify-between col-span-1">
          <p>Name</p>
          <p>Age</p>
        </div>
        <div>
          Actions
        </div>
      </div>
      <ul>
        {renderedPersons}
      </ul>
      
    </div>
  );
};