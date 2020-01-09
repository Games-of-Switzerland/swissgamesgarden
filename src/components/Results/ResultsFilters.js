import React from "react";
import DropdownFilter from "../DropdownFilter";

const ResultsFilters = props => {
  // TODO maybe create a custom hook withSearch, to be able to pass the search filters and everything to the search.
  const options = [
    {
      value: 'android',
      name: 'Android',
    },
    {
      value: 'ios',
      name: 'iOS',
    },
    {
      value: 'nintendo',
      name: 'Nintendo',
    },
    {
      value: 'pc',
      name: 'PC',
    },
    {
      value: 'ps3',
      name: 'PS3',
    },
  ];
  return (
    <div className="mb-spacer">
      <DropdownFilter options={options} title="Platform" />
    </div>
  )
};

export default ResultsFilters;
