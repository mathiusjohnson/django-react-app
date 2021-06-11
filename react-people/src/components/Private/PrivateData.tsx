import React from 'react';
import People from '../HomePage/index';
import Header from '../HomePage/Header';
import { useAuthState } from '../../context/UserContext/index' 

const PrivateData = () => {
    const userDetails = useAuthState() //read user details from context

    const isLoggedIn = userDetails.email.length > 0 ? true : false
    return (
        <div>
            {isLoggedIn && (
                <div>   
                    <Header />
                    <People />  
                </div>
            )}
        </div>
    );
};

export default PrivateData;