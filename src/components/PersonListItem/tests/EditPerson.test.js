import React from "react";
import { screen } from '@testing-library/dom'

import {
  fireEvent,
  getByAltText,
  getByTestId,
  render,
  cleanup,
} from "@testing-library/react";

import EditPerson from "../EditPerson";

afterEach(cleanup);

describe("EditPerson", () => {

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
        testValue: "test"    
    }

    it("renders with initial name", () => {
    render(
        <EditPerson 
            personState={personState} 
        />
    );
    const nameInput = screen.getByTestId("person-name-input")
    expect(nameInput).toHaveValue("Mathius");
    });
})