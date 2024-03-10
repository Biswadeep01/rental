import React, { useState, useEffect, useContext, createContext } from "react";
import { useLocation } from "react-router-dom";

const Context = createContext({
  user: {},
});

export function useAppContext() {
  return useContext(Context);
}

export const AppContext = ({ children }) => {
  const { Provider } = Context;
  const location = useLocation();

  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@mail.com",
  });

  //   useEffect(() => {}, [location]);

  const contextobj = {
    user,
  };

  return <Provider value={contextobj}>{children}</Provider>;
};
