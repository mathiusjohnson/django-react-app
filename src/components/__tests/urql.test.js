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
  executeQuery: jest.fn(() => never),
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

    it.skip('matches snapshot', () => {
    
      const wrapper = mount(
        <Provider value={responseState}>
          <People />
        </Provider>
      );
      expect(wrapper).toMatchSnapshot();
    });
    
    it.skip('triggers a create person mutation', () => {
    
        const wrapper = mount(
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

        wrapper.find('input[name="personName"]').simulate('change', {
             target: { value: variables.name } });
        wrapper.find('input[name="age"]').simulate('change', {
            target: { value: variables.age } });
        wrapper.find('input[name="streetOne"]').simulate('change', {
            target: { value: variables.streetOne } });
        wrapper.find('input[name="cityOne"]').simulate('change', {
            target: { value: variables.cityOne } });
        wrapper.find('input[name="regionOne"]').simulate('change', {
            target: { value: variables.regionOne } });
        wrapper.find('input[name="countryOne"]').simulate('change', {
            target: { value: variables.countryOne } });
        wrapper.find('input[name="postalCodeOne"]').simulate('change', {
            target: { value: variables.postalCodeOne } });
        wrapper.find('input[name="streetTwo"]').simulate('change', {
            target: { value: variables.streetTwo } });
        wrapper.find('input[name="cityTwo"]').simulate('change', {
            target: { value: variables.cityTwo } });
        wrapper.find('input[name="regionTwo"]').simulate('change', {
            target: { value: variables.regionTwo } });
        wrapper.find('input[name="countryTwo"]').simulate('change', {
            target: { value: variables.countryTwo } });
        wrapper.find('input[name="postalCodeTwo"]').simulate('change', {
            target: { value: variables.postalCodeTwo } });
        
        const button = wrapper.findWhere(node => {
            return (
                node.type() &&
                node.name() &&
                node.text() === "Save"
                )
            })
    
        button.simulate('click');
        expect(mockClient.executeMutation).toBeCalledTimes(1);
        expect(mockClient.executeMutation).toBeCalledWith(expect.objectContaining({ variables }), {});
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