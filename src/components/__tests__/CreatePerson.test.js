
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
import CreatePerson from "../HomePage/CreatePerson";

afterEach(cleanup);

const back = jest.fn()

const setup = () => {
    const utils = render(
        <CreatePerson 
            back={back} 
        />
    )
    const nameInput = utils.getByPlaceholderText('Enter Name')
    const ageInput = utils.getByPlaceholderText('Enter Age')
    const streetInput = utils.getByPlaceholderText('Enter Street')
    const cityInput = utils.getByPlaceholderText('Enter City')
    const regionInput = utils.getByPlaceholderText('Enter Region')
    const countryInput = utils.getByPlaceholderText('Enter Country')
    const postalInput = utils.getByPlaceholderText('Enter Postal Code')
    const streetInputTwo = utils.getByPlaceholderText('Enter Street Two')
    const cityInputTwo = utils.getByPlaceholderText('Enter City Two')
    const regionInputTwo = utils.getByPlaceholderText('Enter Region Two')
    const countryInputTwo = utils.getByPlaceholderText('Enter Country Two')
    const postalInputTwo = utils.getByPlaceholderText('Enter Postal Code Two')
    const saveButton = utils.getByText('Save');


    return {
        nameInput,
        ageInput,
        streetInput,
        cityInput,
        regionInput,
        countryInput,
        postalInput,
        streetInputTwo,
        cityInputTwo,
        regionInputTwo,
        countryInputTwo,
        postalInputTwo,
        saveButton,
        ...utils,
    }
}

describe("Create Person", () => {
    it("renders without crashing", () => {
        setup()
    })

    it("fills in all form inputs", () => {
        const save = jest.fn()

        const { nameInput, 
            ageInput, 
            streetInput, 
            cityInput, 
            regionInput, 
            countryInput,
            postalInput, 
            streetInputTwo, 
            cityInputTwo, 
            regionInputTwo, 
            countryInputTwo, 
            postalInputTwo, 
            saveButton, 
            ...utils } = setup()

        fireEvent.change(nameInput, {
            target: { value: "Mathius" },
        });    

        expect(nameInput).toHaveValue('Mathius')

        fireEvent.change(ageInput, {
            target: { value: 35 },
        });   

        expect(ageInput).toHaveValue(35)

        fireEvent.change(streetInput, {
            target: { value: "4444" },
        });    

        expect(streetInput).toHaveValue("4444")
        
        fireEvent.change(cityInput, {
            target: { value: "Van" },
        });    

        expect(cityInput).toHaveValue("Van")

        fireEvent.change(regionInput, {
            target: { value: "bc" },
        });    

        expect(regionInput).toHaveValue("bc")

        fireEvent.change(countryInput, {
            target: { value: "can" },
        });    

        expect(countryInput).toHaveValue("can")

        fireEvent.change(postalInput, {
            target: { value: "v8b0z9" },
        });    

        expect(postalInput).toHaveValue("v8b0z9")

        fireEvent.change(streetInputTwo, {
            target: { value: "4444" },
        });    

        expect(streetInputTwo).toHaveValue("4444")

        fireEvent.change(cityInputTwo, {
            target: { value: "Van" },
        });    

        expect(cityInputTwo).toHaveValue("Van")

        fireEvent.change(regionInputTwo, {
            target: { value: "bc" },
        });    

        expect(regionInputTwo).toHaveValue("bc")

        fireEvent.change(countryInputTwo, {
            target: { value: "can" },
        });    

        expect(countryInputTwo).toHaveValue("can")

        fireEvent.change(postalInputTwo, {
            target: { value: "v8b0z9" },
        });     

        expect(postalInputTwo).toHaveValue("v8b0z9")

        // fireEvent.click(saveButton);

        // expect(save).toHaveBeenCalled()
    })
})