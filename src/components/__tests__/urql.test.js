import { mount, configure } from 'enzyme';
import { Provider } from 'urql';
import { never, fromValue } from 'wonka';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {
    cleanup, fireEvent, render,
  } from "@testing-library/react";
import { People } from '../HomePage/PersonList';
import CreatePerson from '../HomePage/CreatePerson';
import EditPerson from '../HomePage/PersonListItem/EditPerson';

configure({ adapter: new Adapter() });

const mockClient = {
  executeQuery: jest.fn(() => 
    fromValue({
        data: {
            personData: {
                name: "mathius",
                age: 24,
                addressOne: {
                    street: "1234",
                    city: "cad",
                    region: "bc",
                    country: "can",
                    postalCode: "v8b0z9"
                },
                addressTwo: {
                    street: "1234",
                    city: "cad",
                    region: "bc",
                    country: "can",
                    postalCode: "v8b0z9"
                }
            }
        }
    })
  ),
  executeMutation: jest.fn(() => never),
  executeSubscription: jest.fn(() => never),
};

// jest.mock('../components/PersonListItem/EditPerson', () => () => ({
//     onSave:jest.fn(
//     )
// }))
afterEach(cleanup);


const onSave = jest.fn();
    
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

const personState = {
    id: 1,
    oldName: 'Mathius', 
    oldAge: 25, 
    addressOne: {
        street: '1234', 
        city: 'edd', 
        region: 'ddd', 
        country: 'can', 
        postalCode: 'v8b0z9'
    },
    addressTwo: {
        street: '1234', 
        city: 'edd', 
        region: 'ddd', 
        country: 'can', 
        postalCode: 'v8b0z9'
    },     
}


describe("urql tests", () => {
    
    it('triggers a create person mutation', () => {
    
        const wrapper = render(
          <Provider value={mockClient}>
            <CreatePerson />
          </Provider>
        );
      
        const variables = { 
            name: 'mathius', 
            age: 24, 
            streetOne: '1234',
            cityOne: 'cad',
            regionOne: 'bc',
            countryOne: 'can',
            postalCodeOne: 'v8b0z9',
            streetTwo: '1234',
            cityTwo: 'cad',
            regionTwo: 'bc',
            countryTwo: 'can',
            postalCodeTwo: 'v8b0z9'  
        };

        const nameInput = wrapper.getAllByPlaceholderText('Enter Name')[0]
        const ageInput = wrapper.getAllByPlaceholderText('Enter Age')[0]

        fireEvent.change(nameInput, {
            target: { value: variables.name } });

        fireEvent.change(ageInput, {
            target: { value: variables.age } });

        const streetOnInput = wrapper.getAllByPlaceholderText('Enter Street')[0]
        
        fireEvent.change(streetOnInput, {
            target: { value: variables.streetOne } });
            
        const cityOneInput = wrapper.getAllByPlaceholderText('Enter City')[0]
        fireEvent.change(cityOneInput, {
            target: { value: variables.cityOne } });

        const regionOneInput = wrapper.getAllByPlaceholderText('Enter Region')[0]
        
        fireEvent.change(regionOneInput, {
            target: { value: variables.regionOne } });
            
        const countryOneInput = wrapper.getAllByPlaceholderText('Enter Country')[0]
        fireEvent.change(countryOneInput, {
            target: { value: variables.countryOne } });

        const postalCodeOneInput = wrapper.getAllByPlaceholderText('Enter Postal Code')[0]
        
        fireEvent.change(postalCodeOneInput, {
            target: { value: variables.postalCodeOne } });
            
        const streetTwoInput = wrapper.getAllByPlaceholderText('Enter Street Two')[0]
        fireEvent.change(streetTwoInput, {
            target: { value: variables.streetTwo } });

        const cityTwoInput = wrapper.getAllByPlaceholderText('Enter City Two')[0]
        
        fireEvent.change(cityTwoInput, {
            target: { value: variables.cityTwo } });
            
        const regionTwoInput = wrapper.getAllByPlaceholderText('Enter Region Two')[0]
        fireEvent.change(regionTwoInput, {
            target: { value: variables.regionTwo } });

        const countryTwoInput = wrapper.getAllByPlaceholderText('Enter Country Two')[0]

        fireEvent.change(countryTwoInput, {
            target: { value: variables.countryTwo } });
           
        const postalCodeTwoInput = wrapper.getAllByPlaceholderText('Enter Postal Code Two')[0]

        fireEvent.change(postalCodeTwoInput, {
            target: { value: variables.postalCodeTwo } });
        
        // console.log(wrapper.debug());
        const saveButton = wrapper.getAllByText("Save")[0]


        fireEvent.click(saveButton)

        expect(mockClient.executeMutation).toBeCalledTimes(1);
        // expect(mockClient.executeMutation).toBeCalledWith(expect.objectContaining({ variables }), {});
      });
    
    it('triggers an update person mutation', () => {
    
        const utils = render(
            <Provider value={responseState}>
                <EditPerson 
                    personState={personState}
                    onSave={onSave}
                />
            </Provider>
        );
    
        const variables = {
            id: 1,
            name: 'New Name',
            age: 35
        }
        const nameInput = utils.getAllByPlaceholderText('Enter Name')[0]
        const ageInput = utils.getAllByPlaceholderText('Enter Age')[0]
    
        fireEvent.change(nameInput, {
            target: { value: variables.name } });

        fireEvent.change(ageInput, {
            target: { value: variables.age } });
    
        const saveButton = utils.getAllByText("Save")[0]
        
        fireEvent.click(saveButton)

        expect(onSave).toBeCalledTimes(1);
        expect(onSave).toBeCalledWith("New Name", "35");
    });
})