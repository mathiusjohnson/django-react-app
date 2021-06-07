import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { LocationContext } from '../../context/index';

const NavigationLinks = () => {
    const { currentLocation } = useContext(LocationContext);

    const activeClass = (location) => {
        if (location === currentLocation) {
            console.log('checks out');
            return 'border-b-2 border-solid border-white'
        } else {
            console.log('doesnt check out');
            return ''
        }
    }

    return (
           
      <div className={`text-white text-2xl p-6 hidden sm:flex items-start justify-start z-50 mt-3`}>
        <div className="flex flex-wrap space-x-4 z-50">

          {/* NAVIGATION LINKS */}
          <Link className={`nav-link hover:opacity-70 ${activeClass('/home')}`} to="/">
            Home
          </Link>

          <Link className={`nav-link hover:opacity-70 ${activeClass('/about')}`} to="/about">
            About
          </Link>


          <Link className={`nav-link hover:opacity-70 ${activeClass('/contact')}`} to="/contact">
            Contact
          </Link>

        </div>
      </div>

    );
};

export default NavigationLinks;