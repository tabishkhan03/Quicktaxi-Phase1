import React, { createContext, useReducer } from "react";

export const DriverContext = createContext();

export const DriverProvider = ({ children }) => {
  const initialState = {
    driver: null,
  };

  function reducer(state, action) {
    switch (action.type) {
      case "SET_DRIVER":
        return { ...state, driver: action.payload };

      default:
        return state;
    }
  }

  const [Driverstate, dispatch] = useReducer(reducer, initialState);

  return (
    <DriverContext.Provider value={{ Driverstate, dispatch }}>
      {children}
    </DriverContext.Provider>
  );
};
