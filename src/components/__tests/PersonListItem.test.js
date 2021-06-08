import { fireEvent, render, cleanup } from '@testing-library/react';
import { BrowserRouter as Router } from "react-router-dom";
import PersonListItem from '../HomePage/PersonListItem/index';
import { LocationContextProvider } from "../../context";
import { AuthProvider } from "../../context/UserContext";

afterEach(cleanup);

const providerProps = {
    currentLocation: '/home',
    setCurrentLocation: (value) => {},
}

const customRender = (ui, { providerProps, ...renderOptions }) => {
    return render(
        <Router>
            <LocationContextProvider value={providerProps}>
                <AuthProvider>
                    {ui}
                </AuthProvider>
            </LocationContextProvider>,
            
        </Router>
    );
};

const personState = {
    id: 1,
    name: 'Mathius', 
    age: 25, 
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

const mockClient = {
    executeQuery: jest.fn(() => never),
    executeMutation: jest.fn(() => never),
    executeSubscription: jest.fn(() => never),
};

const setup = () => {
    const utils = customRender(
        <PersonListItem value={mockClient} person={personState} />, 
        { providerProps }
    );

    const EditButton = utils.getAllByText('Edit from')[0];

    return {
        ...utils,
        EditButton
    }
}

describe("Person List Item", () => {

    it("renders without crashing", () => {
        setup()
    });


    it("calls onEditClicked, and changes visual mode to EditPerson.js", () => {
        const { EditButton, ...utils } = setup()

        
        fireEvent.click(EditButton)

        expect(utils.getByPlaceholderText('Enter Name')).toHaveValue('Mathius')

    })

    it("edits a person and calls save", () => {
        const { EditButton, ...utils } = setup()

        fireEvent.click(EditButton)

        const nameInput = utils.getAllByPlaceholderText('Enter Name')[0]

        fireEvent.change(nameInput, {
            target: { value: 'Joe' }
        })

        expect(nameInput).toHaveValue('Joe')

        const ageInput = utils.getAllByPlaceholderText('Enter Age')[0]

        fireEvent.change(ageInput, {
            target: { value: 45 }
        })

        expect(ageInput).toHaveValue(45)

        const saveButton = utils.getByText("Save")

        fireEvent.click(saveButton)

        // console.log(utils.debug());
        expect(utils.getByText("Updating User...")).toBeInTheDocument()
    })
})
