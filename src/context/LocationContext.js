import React, { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from 'react-router-dom'

export const Context = createContext();



export const Provider = ({children}) => {
    // Initial values are obtained from the props
    const history = useHistory() 
    console.log(history.location);
    const [currentLocation, setCurrentLocation] = useState(history.location.pathname);

    useEffect(() => {
        return history.listen((location) => { 
            setCurrentLocation(location.pathname)
            console.log(`You changed the page to: ${location.pathname}`) 
        }) 
     },[history])
     

    // Make the context object;
    const locationContext = {
        currentLocation
    };

  // pass the value in provider and return
  return <Context.Provider value={locationContext}>{children}</Context.Provider>;
};

export const { Consumer } = Context;

Provider.propsTypes = {
    currentLocation: PropTypes.string,
};

Provider.defaultProps = {
    currentLocation: ""
};
