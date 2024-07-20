import React, { createContext, useReducer } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const initialState = {
    userLocation: { lng: 72.831581, lat: 19.141955 },
    sourceLocation: null,
    destinationLocation: null,
    direction: [],
    sourceName:null,
    destinationName:null // Add tripid to the initial state if it's part of your state
  };

  function reducer(state, action) {
    switch (action.type) {
      case "SET_USER_LOCATION":
        return { ...state, userLocation: action.payload };
      case "SET_SOURCE_LOCATION":
        return { ...state, sourceLocation: action.payload };
      case "SET_DESTINATION_LOCATION":
        return { ...state, destinationLocation: action.payload };
      case "SET_DIRECTION":
        return { ...state, direction: action.payload };
      case "SET_SOURCE_NAME":
        return { ...state, sourceName: action.payload }; 
      case "SET_DESTINATION_NAME":
        return { ...state, destinationName: action.payload }; 
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
