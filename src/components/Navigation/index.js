import React from "react";
import { withRouter } from "react-router-dom";
import NavigationLinks from "./NavigationLinks";
import DropDown from "./DropDown";

function Navigation(props) {

  const dropDownPosition = props.location.pathname === '/home' || props.location.pathname === '/' ? 'start' : 'center'
  return (

      <nav className="z-50">
        <div>

          <div className="bg-blue-500 grid grid-cols-2 lg:grid-cols-3 w-100">
            <DropDown dropDownPosition={dropDownPosition} />
            <NavigationLinks />
          </div>
      </div>
    </nav>
  );
}

export default withRouter(Navigation);