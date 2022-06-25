import { useRouter } from "next/router";
import { useContext, createContext, useState, useReducer } from "react";
import { useEffect } from "react";
import { Context as UrqlContext } from "urql";

const AuthContext = createContext();

function reducer(state, action) {
  if (action.type === "SET_TOKEN") {
    return {
      age: state.age + 1,
    };
  }
  throw Error("Unknown action.");
}

const initialState = {
  token: null,
};

export const AuthProvider = ({ children }) => {
  // this is a way to get the same client we created on _app.js
  // the context is given by urql and we are just consuming here
  const client = useContext(UrqlContext);

  // currently we are just keeping the token in a state
  // but not consuming it, but this is something necessary
  // for future usecases
  const [token, setToken] = useState();

  // call this function, ideally from logout
  const clearToken = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  // whoever needs to set the token, ideally login page
  // will call this function and this one will take care 
  // of setting the token in localStorage and state
  const storeToken = (token) => {
    if (!token) {
      return clearToken();
    }
    setToken(token);
    localStorage.setItem("token", token);
  };

  // typically runs after initial render and after
  // every client change. but client is never gonna change and that
  // is promised by urql. so this will only run once
  // gets the token from localstorage, sets it to state and updates
  // the client

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
    if (token) {
      localStorage.setItem("token", token);
      client.fetchOptions.headers.Authorization = `Bearer ${token}`;
    } else {
      localStorage.removeItem("token");
      delete client.fetchOptions.headers.Authorization;
    }
  }, [client]);

  return (
    <AuthContext.Provider value={{ storeToken, clearToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
