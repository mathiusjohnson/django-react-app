
import React from "react";

import {
  fireEvent,
  getByAltText,
  getAllByTestId,
  getByText,
  getByDisplayValue,
  getByPlaceholderText,
  render,
  cleanup,
  waitFor,
  getByTestId,
} from "@testing-library/react";

import EditPerson from "../HomePage/PersonListItem/EditPerson";
import PersonListItem from "../HomePage/PersonListItem/PersonListItem";

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

const setup = () => {
    const utils = render(
        <EditPerson 
            personState={personState} 
            onSave={onSave}
        />
    )
    const nameInput = utils.getByPlaceholderText('Enter Name')
    const ageInput = utils.getByPlaceholderText('Enter Age')
    const saveButton = utils.getByText('Save');

    return {
        nameInput,
        ageInput,
        saveButton,
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

//   it("finds the name and age input and changes them", () => {
//     const { getByPlaceholderText } = render(
//       <EditPerson personState={personState} />
//     );

//     fireEvent.change(getByPlaceholderText("Enter Name"), {
//         target: {
//             input: {
//                 value: "Joe"
//             }
//         }
//     })

//     expect(getByPlaceholderText("Enter Name")).toHaveValue("Joe");
//   });

//   it("validates that the student name is not blank", () => {
//     const onSave = jest.fn();
//     const { getByText } = render(
//       <Form personState={personState} onSave={onSave} />
//     );

//     fireEvent.click(getByText("Save"));

//     expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
//     expect(onSave).not.toHaveBeenCalled();
//   });

//   it("can successfully save after trying to submit an empty student name", () => {
//     const onSave = jest.fn();
//     const {
//       getByText,
//       getByPlaceholderText,
//       queryByText,
//       debug,
//       container,
//     } = render(<Form interviewers={interviewers} onSave={onSave} />);

//     fireEvent.click(getByText("Save"));

//     expect(getByText(/Student name cannot be blank/i)).toBeInTheDocument();
//     expect(onSave).not.toHaveBeenCalled();

//     fireEvent.change(getByPlaceholderText("Enter Student Name"), {
//       target: { value: "Lydia Miller-Jones" },
//     });
//     fireEvent.click(getByAltText(container, "Sylvia Palmer"));

//     fireEvent.click(getByText("Save"));

//     expect(queryByText(/Student name cannot be blank/i)).toBeNull();

//     expect(onSave).toHaveBeenCalledTimes(1);
//   });

//   it("calls onCancel and resets the input field", () => {
//     const onCancel = jest.fn();
//     const { getByText, getByPlaceholderText, queryByText } = render(
//       <Form
//         interviewers={interviewers}
//         name="Lydia Mill-Jones"
//         onSave={jest.fn()}
//         onCancel={onCancel}
//       />
//     );

//     fireEvent.click(getByText("Save"));

//     fireEvent.change(getByPlaceholderText("Enter Student Name"), {
//       target: { value: "Lydia Miller-Jones" },
//     });

//     fireEvent.click(getByText("Cancel"));

//     expect(queryByText(/student name cannot be blank/i)).toBeNull();

//     expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");

//     expect(onCancel).toHaveBeenCalledTimes(1);
//   });
});