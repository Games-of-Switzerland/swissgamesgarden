import React from 'react';
import Dropdown from 'components/Dropdown';
import PropTypes from 'prop-types';

const GamesFilters = ({filters}) => {
  const {all_filtered_platforms} = filters;
  // console.log(
  //   all_filtered_platforms.all_nested_platforms.platforms_name_keyword
  // );
  return (
    <div className="text-white">
      {/*<Dropdown title="Platforms">*/}
      {/*  {platforms.map(platform => {*/}
      {/*    console.log(platform);*/}
      {/*  })}*/}
      {/*</Dropdown>*/}
    </div>
  );
};

GamesFilters.propTypes = {
  filters: PropTypes.object.isRequired,
};

export default GamesFilters;
