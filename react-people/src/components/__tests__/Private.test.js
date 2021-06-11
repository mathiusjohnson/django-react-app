import { render } from '@testing-library/react';
import Private from '../../pages/Private';
import { BrowserRouter as Router } from "react-router-dom";
import { LocationContextProvider } from "../../context";
import { AuthProvider } from "../../context/UserContext";

const providerProps = {
    currentLocation: '/home',
    setCurrentLocation: (value) => {},
}

const customRender = (ui, { providerProps, ...renderOptions }) => {
    let payload = {name: "joe", email: "joe@test.ca", isAdmin: true}
    return render(
    <Router>
        <LocationContextProvider value={providerProps}>
            <AuthProvider value={payload}>
                {ui}
            </AuthProvider>
        </LocationContextProvider>,
        renderOptions
      </Router>
    );
};

const setup = () => {
    const utils = customRender(
        <Private />, 
        { providerProps }
    );

    return {
        ...utils
    }
}
it("renders without crashing", () => {
    setup()
});