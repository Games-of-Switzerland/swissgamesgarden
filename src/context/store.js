import React, {createContext, useReducer} from "react";

const initialState = {
  filters: {}
};
const store = createContext(initialState);
const {Provider} = store;

const StateProvider = ({children}) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'update filters':
        const newState = {
          ...state,
        };
        console.log(newState);
        return newState;
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{state, dispatch}}>
    {children}
  </Provider>;
};

export {store, StateProvider};
