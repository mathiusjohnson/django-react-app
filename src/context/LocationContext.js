import React, { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from 'react-router-dom'

export const Context = createContext();



export const Provider = ({children}) => {
    // Initial values are obtained from the props
    const history = useHistory() 
    const path = history.location.pathname
    const [currentLocation, setCurrentLocation] = useState(path);
    const [editButtonText, setEditButtonText] = useState(`Edit from ${path.replace('/', '')}`)

    useEffect(() => {
        return history.listen((location) => { 
            setEditButtonText(`Edit from ${location.pathname.replace('/', '')}`)
            setCurrentLocation(location.pathname)
        }) 
     },[history])
     

    // Make the context object;
    const locationContext = {
        currentLocation,
        editButtonText,
        setEditButtonText
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
