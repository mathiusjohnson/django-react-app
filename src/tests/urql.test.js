import { mount, configure } from 'enzyme';
import { Provider } from 'urql';
import { never, fromValue } from 'wonka';
import { People } from '../components/PersonList';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';


configure({ adapter: new Adapter() });

const mockClient = {
  executeQuery: jest.fn(() => never),
  executeMutation: jest.fn(() => never),
  executeSubscription: jest.fn(() => never),
};

it('matches snapshot', () => {
    const responseState = {
        executeQuery: () =>
          fromValue({
            data: {
                allPersons: [
                    {
                      id: "10",
                      name: "Joe Two",
                      age: 22,
                      addressOne: {
                        street: "38030 loggers lane",
                        city: "Squamish",
                        region: "BC",
                        country: "Canada",
                        postalCode: "v8b0z9"
                      },
                      addressTwo: {
                        street: "38030 loggers lane",
                        city: "Squamish",
                        region: "BC",
                        country: "Canada",
                        postalCode: "v8b0z9"
                      }
                    },
                    {
                        id: "10",
                        name: "Joe Two",
                        age: 22,
                        addressOne: {
                          street: "38030 loggers lane",
                          city: "Squamish",
                          region: "BC",
                          country: "Canada",
                          postalCode: "v8b0z9"
                        },
                        addressTwo: {
                          street: "38030 loggers lane",
                          city: "Squamish",
                          region: "BC",
                          country: "Canada",
                          postalCode: "v8b0z9"
                        }
                      }
                    ]
                }
          }),
      };

  const wrapper = mount(
    <Provider value={responseState}>
      <People />
    </Provider>
  );
  expect(wrapper).toMatchSnapshot();
});

// it('skips the query', () => {
//     mount(
//       <Provider value={mockClient}>
//         <App skip={true} />
//       </Provider>
//     );
//     expect(mockClient.executeQuery).toBeCalledTimes(0);
//   });

