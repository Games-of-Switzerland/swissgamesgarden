import React from "react";
import ListFilters from "../ListFilters";
import {RefinementListFilter} from "searchkit";
import Dropdown from "../Dropdown";

const ResultsFilters = () => (
  <div className="filters">
    <RefinementListFilter
      id="genres"
      title="Genres"
      field="genres.name.raw"
      operator="AND"
      containerComponent={Dropdown}
      listComponent={ListFilters}
      orderKey="_term"
    />
    <RefinementListFilter
      id="studios"
      title="Studios"
      field="studios.name.raw"
      fieldOptions={{type: 'nested', options: {path: 'studios'}}}
      operator="AND"
      containerComponent={Dropdown}
      listComponent={ListFilters}
      orderKey="_term"
    />
  </div>
);

export default ResultsFilters;
