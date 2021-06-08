import React from "react";
import { Provider } from 'urql';

import { LocationContextProvider } from "../../context";
import { AuthProvider } from "../../context/UserContext";
import { fromValue, never } from 'wonka';
import { BrowserRouter as Router } from "react-router-dom";

import { render } from "@testing-library/react";


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

export const customRender = (ui, { providerProps, ...renderOptions }) => {
    let payload = {name: "joe", email: "joe@test.ca", isAdmin: true}

    return render(
        <Provider value={queryResponseState}>
            <Router>
                <LocationContextProvider value={providerProps}>
                    <AuthProvider value={payload}>
                        {ui}
                    </AuthProvider>
                </LocationContextProvider>,
                
            </Router>
        </Provider>
    );
};