import React, { useContext } from 'react';
import { withRouter } from "react-router-dom";
import NavigationLinks from "./NavigationLinks";
import DropDown from "./DropDown";
import { LocationContext } from '../../context/index';

function Navigation(props) {
    const { currentLocation } = useContext(LocationContext);

    const dropDownPosition = props.location.pathname === '/home' || props.location.pathname === '/' ? 'start' : 'center'
    return (

        <nav className="mb-12">
            <div>

                <div className="bg-blue-500 grid grid-cols-2 lg:grid-cols-3 w-100">
                    <DropDown dropDownPosition={dropDownPosition} />
                    <NavigationLinks />
                    <div className="flex items-center text-white">Current Location is {currentLocation}, retrieved from context</div>
                </div>
            </div>
        </nav>
    );
}

export default withRouter(Navigation);