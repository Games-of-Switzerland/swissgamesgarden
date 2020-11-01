import React, {useContext, useEffect, useReducer} from 'react';
import {FILTERS} from 'config';
import addOrRemove from '../../utils/addOrRemove';

const FiltersContext = React.createContext(null);

const initialState = {
  platforms: [],
};

const filtersReducer = (state, action) => {
  switch (action.type) {
    case FILTERS.PLATFORMS:
      return {
        ...state,
        platforms: addOrRemove(state.platforms, action.payload),
      };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const FilterContextProvider = props => {
  const [state, dispatch] = useReducer(filtersReducer, initialState);

  return <FiltersContext.Provider value={[state, dispatch]} {...props} />;
};

const useFiltersContext = () => {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error(
      'useFiltersContext must be used within a FilterContextProvider'
    );
  }
  return context;
};

export {FilterContextProvider, useFiltersContext};
