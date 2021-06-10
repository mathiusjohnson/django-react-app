import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { mount, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { Provider } from 'urql';
import { never, fromValue } from 'wonka';
import { LocationContextProvider } from "../../context";
import { AuthProvider } from "../../context/UserContext";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";

import { People } from "../HomePage/PersonList";

import { act } from "react-dom/test-utils";

afterEach(cleanup);

configure({ adapter: new Adapter() });


const providerProps = {
    currentLocation: '/home',
    setCurrentLocation: (value) => {},
}



export const queryResponseState = {
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
    executeMutation: jest.fn(() => never),
    executeSubscription: jest.fn(() => never)
  };

describe("PersonList", () => {
    it("renders without crashing", () => {
      render(<People />);
    });

    it("transitions to create on clicking Add Person", async() => {
        let payload = {name: "joe", email: "joe@test.ca", isAdmin: true}
        await act(async() => {
            const wrapper = render(
            <Provider value={queryResponseState}>
                <Router>
                    <LocationContextProvider value={providerProps}>
                        <AuthProvider value={payload}>
                            <People />
                        </AuthProvider>
                    </LocationContextProvider>
                </Router>
            </Provider>
            )

            const AddButton = wrapper.getByText("Add New Person")
            
            fireEvent.click(AddButton)

            await waitFor(() => {
                wrapper.getAllByPlaceholderText('Enter Name')[0]
            })
            const nameInput = wrapper.getAllByPlaceholderText('Enter Name')[0]

            expect(nameInput).toHaveValue("")
        })
    })
})

