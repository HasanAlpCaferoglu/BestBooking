import { createContext, useReducer } from "react";

const defaultStartDay = new Date();
const defaultEndDay = new Date();
defaultEndDay.setDate(defaultEndDay.getDate() + 1);

const INITIAL_STATE = {
  city: undefined,
  dates: [
    {
      startDate: defaultStartDay,
      endDate: defaultEndDay,
      key: "selection",
    },
  ],
  options: {
    adult: 1,
    children: 0,
    room: 1,
  },
};

export const SearchContext = createContext(INITIAL_STATE);

const SearchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH": // whenever we changed search information from the home page we are going to dispatch this action
      return action.payload;
    case "RESET_SEARCH":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const SearchContextProvider = ({ children }) => {
  // this children our components which we want to reach these data
  // we are going to wrap our application
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

  return (
    <SearchContext.Provider
      value={{
        city: state.city,
        dates: state.dates,
        options: state.options,
        dispatch,
      }}
      // value is what we want to pass to children
      // we should pass dispatch because when we update search bar we are going to call NEW_SEARCH action
    >
      {children}
    </SearchContext.Provider>
  );
};
