import { Button } from '@material-ui/core';
import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { LocationContext } from '../../context/index';
import { loginUser, logout, useAuthState, useAuthDispatch } from '../../context/UserContext/index' 

const NavigationLinks: React.FC = () => {
    const { currentLocation } = useContext(LocationContext);
    // const { currentUser } = useContext(LocationContext);
    const dispatch = useAuthDispatch() //get the dispatch method from the useDispatch custom hook
    const userDetails = useAuthState() //read user details from context

    const activeClass = (location: string) => {
        if (location === currentLocation) {
            return 'border-b-2 border-solid border-white'
        } else {
            return ''
        }
    }

    const handleLogin = async (event: React.ChangeEvent<any>) => {
        event.preventDefault()
        let payload = {name: "joe", email: "joe@test.ca", isAdmin: true}
        try {
            await loginUser(dispatch, payload) //loginUser action makes the request and handles all the neccessary state changes
        } catch (error) {
            console.error(error)
        }
    }

    const handleLogout = () => {
        logout(dispatch) //call the logout action
    }

    const isLoggedIn = userDetails.email.length !== 0 ? true : false
    return (
           
      <div className={`text-white text-2xl p-6 items-start justify-start z-50 mt-3`}>
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

          <Link className={`nav-link hover:opacity-70 ${activeClass('/private')}`} to="/private">
            Private
          </Link>

            {!isLoggedIn && (
                <Button onClick={handleLogin}>Log In</Button>
            )}

            {isLoggedIn && (
                <Button onClick={handleLogout}>Log Out</Button>
            )} 
        </div>
      </div>

    );
};

export default NavigationLinks;