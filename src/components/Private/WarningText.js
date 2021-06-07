import React from 'react';
import { useAuthState } from '../../context/UserContext/index' 

const WarningText = () => {
    const userDetails = useAuthState() //read user details from context

    const isLoggedIn = userDetails.email.length > 0 ? true : false

    const warningText = isLoggedIn ? "This content should only be rendered when the user is logged in!" : "Please login to view this content"
    return (
        <div>
            <h1 className="text-2xl mb-8">{warningText}</h1>
        </div>
    );
};

export default WarningText;