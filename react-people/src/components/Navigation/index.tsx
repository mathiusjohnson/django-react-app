import React, { useContext } from 'react';
import { withRouter } from "react-router-dom";
import NavigationLinks from "./NavigationLinks";
import { LocationContext } from '../../context/index';


function Navigation() {
    const { currentLocation } = useContext(LocationContext);

    return (

        <nav className="mb-12">
            <div>

                <div className="bg-blue-500 grid grid-cols-2 lg:grid-cols-3 w-100">
                    <NavigationLinks />
                    <div className="flex items-center text-white">Current Location is {currentLocation}, retrieved from context</div>
                </div>
            </div>
        </nav>
    );
}

export default withRouter(Navigation);