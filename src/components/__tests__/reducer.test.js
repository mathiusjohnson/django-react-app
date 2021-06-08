import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { BrowserRouter as Router } from "react-router-dom";
import { LocationContextProvider } from "../../context";
import { AuthProvider } from "../../context/UserContext";
import Navigation from '../Navigation/index';
import { AuthReducer } from "../../context/UserContext/reducer";

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
        renderOptions
      </Router>
    );
};

const setup = () => {
    const utils = customRender(
        <Navigation />, 
        { providerProps }
    );
    return {
        ...utils
    }
}

describe("reducer login/logout", () => {
    it('shows success message after confirm button is clicked', () => {
      const utils = setup()
    
      expect(utils.getByText(/Log In/i)).toBeInTheDocument()
    
      fireEvent.click(utils.getByText('Log In'))
    
      expect(utils.getByText('Log Out')).toBeInTheDocument()

      fireEvent.click(utils.getByText('Log Out'))


      expect(utils.getByText('Log In')).toBeInTheDocument()

    })

    it("thows an error with an unsupported type", () => {
        expect(() => AuthReducer({}, { type: null })).toThrowError(
          /tried to reduce with unsupported action type/i
        );
      });
})
