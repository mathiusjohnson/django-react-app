import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

export const Context = createContext();

export const Provider = ({children}) => {
    // Initial values are obtained from the props

    const [user, setUser] = useState('');
     
    // Make the context object;
    const userContext = {
        user,
        setUser
    };

  // pass the value in provider and return
  return <Context.Provider value={userContext}>{children}</Context.Provider>;
};

export const { Consumer } = Context;

Provider.propsTypes = {
    user: PropTypes.string,
    setUser: PropTypes.func
};

Provider.defaultProps = {
    userContext: ""
};
