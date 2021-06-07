import React, { useContext } from 'react';
import { LocationContext } from '../../context/index';

const SecondChild = () => {
    const { currentLocation } = useContext(LocationContext);

    return (
        <div>
            Second Child
            Current Location is {currentLocation} found with context
        </div>
    );
};

export default SecondChild;