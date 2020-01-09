import React from "react";
import DropdownFilter from "../DropdownFilter";

const ResultsFilters = props => {
  // TODO maybe create a custom hook withSearch, to be able to pass the search filters and everything to the search.
  const options = [
    {
      value: 'android',
      name: 'Android',
      selected: false,
    },
    {
      value: 'ios',
      name: 'iOS',
      selected: false,
    },
    {
      value: 'nintendo',
      name: 'Nintendo',
      selected: false,
    },
    {
      value: 'pc',
      name: 'PC',
      selected: false,
    },
    {
      value: 'ps3',
      name: 'PS3',
      selected: false,
    },
  ];
  return (
    <div className="mb-spacer">
      <DropdownFilter options={options} title="Platform" />
    </div>
  )
};

export default ResultsFilters;
