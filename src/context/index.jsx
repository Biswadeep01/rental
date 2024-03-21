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

  const [user, setUser] = useState({});

  const handleGetUser = () => {
    try {
      const token = localStorage.getItem("token");
      setUser({
        user: JSON.parse(localStorage.getItem("user")),
        token,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleGetUser();
  }, [location]);

  const contextobj = {
    user,
  };

  return <Provider value={contextobj}>{children}</Provider>;
};
