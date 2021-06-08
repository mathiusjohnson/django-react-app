
import React from "react";

import {
  fireEvent,
  render,
  cleanup,
} from "@testing-library/react";

import EditPerson from "../HomePage/PersonListItem/EditPerson";

afterEach(cleanup);


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

const onSave = jest.fn()
const onCancel = jest.fn()

const setup = () => {

    const utils = render(
        <EditPerson 
            personState={personState} 
            onSave={onSave}
            onCancel={onCancel}
        />
    )
    const nameInput = utils.getAllByPlaceholderText('Enter Name')[0]
    const ageInput = utils.getAllByPlaceholderText('Enter Age')[0]
    const saveButton = utils.getAllByText('Save')[0];
    const cancelButton = utils.getAllByText('Cancel')[0];

    return {
        nameInput,
        ageInput,
        saveButton,
        cancelButton,
        ...utils,
    }
  }

describe("Edit Person", () => {


    it("renders with current name and age ", () => {
        const { getByPlaceholderText } = render(
        <EditPerson personState={personState} />
        );
        expect(getByPlaceholderText("Enter Name")).toHaveValue("Mathius");
        expect(getByPlaceholderText("Enter Age")).toHaveValue(25);

    });


    it("loads data and edits a person", async () => {
            const { nameInput, ageInput, saveButton } = setup()

            const validate = jest.fn()

            
            expect(nameInput).toHaveValue("Mathius")
            expect(ageInput).toHaveValue(25)

            fireEvent.change(nameInput, {
            target: { value: "Joe" },
            });

            expect(nameInput).toHaveValue("Joe")

            fireEvent.change(ageInput, {
                target: { value: 45 },
            });

            expect(ageInput).toHaveValue(45)

            fireEvent.click(saveButton)

            expect(onSave).toHaveBeenCalled()

    })


    it("validates that the name is not blank", async() => {
        const validate = jest.fn()
        
        const { nameInput, ageInput, saveButton, ...utils } = setup()

        fireEvent.change(nameInput, {
            target: { value: "" },
        });    

        fireEvent.click(saveButton);

        // console.log(utils.debug(), saveButton);
        // await waitFor(() => {
        //     utils.getByText("Name cannot be blank")
        // })
        expect(utils.getByText(/Name cannot be blank/i)).toBeInTheDocument();
        expect(onSave).not.toHaveBeenCalled();
    });

    it("cancels editing a person and resets the placeholder value", () => {
    setup()

        const reset = jest.fn()

        const { nameInput, ageInput, cancelButton, saveButton, ...utils } = setup()


        fireEvent.change(nameInput, {
            target: { value: 'Joe' }
        })

        expect(nameInput).toHaveValue('Joe')

        fireEvent.click(cancelButton)
        
        // console.log(utils.debug());
        expect(nameInput).toHaveValue('')
        expect(ageInput).toHaveValue(null)


    })
});