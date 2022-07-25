import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
  // when application is refreshed, user will not be null, firstly, local storage wll be checked
  user: JSON.parse(localStorage.getItem("user")) || null, 
  loading: false,
  error: null,
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START": //when we click on login button, run LOGIN_START action
      return {
        user: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS": 
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE": 
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT": 
      return {
        user: null,
        loading: false,
        error: null,
      }; 
    
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
 
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  // when user login, save user into local storage. So, refreshing page won't result in logged out
  
  useEffect(()=> {
    localStorage.setItem("user", JSON.stringify(state.user)) // store string in local storage
  }, [state.user])

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
      
    >
      {children}
    </AuthContext.Provider>
  );
};


