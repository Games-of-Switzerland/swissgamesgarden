import React from 'react';
import PropTypes from 'prop-types';
import BaseFilter from './BaseFilter';
import ReleasesFilter from './ReleasesFilter';
import FiltersList from './FiltersList';

const GamesFilters = ({filters}) => {
  const platforms =
    filters?.all_filtered_platforms?.all_nested_platforms.platforms_name_keyword
      .buckets || [];
  const stores =
    filters?.all_filtered_stores?.all_nested_stores.stores_name_keyword
      .buckets || [];
  const releases =
    filters?.all_filtered_release_years_histogram?.all_nested_release_years
      .releases_over_time.buckets;
  const cantons =
    filters?.all_filtered_cantons?.all_nested_cantons.cantons_name_keyword
      .buckets || [];
  const genres =
    filters?.all_filtered_genres?.all_nested_genres.genres_name_keyword
      .buckets || [];
  const states =
    filters?.all_filtered_states?.all_nested_states.states_name_keyword
      .buckets || [];

  return (
    <div className="mb-3">
      <div className="text-white flex -mr-1 flex-wrap mb-3">
        <BaseFilter filterName="stores" data={stores} />
        <BaseFilter filterName="platforms" data={platforms} />
        <BaseFilter filterName="cantons" data={cantons} />
        {releases?.length > 0 && (
          <ReleasesFilter data={releases} filterName="release_year_range" />
        )}
        <BaseFilter filterName="states" data={states} />
        <BaseFilter filterName="genres" data={genres} />
      </div>
      <FiltersList />
    </div>
  );
};

GamesFilters.propTypes = {
  filters: PropTypes.object.isRequired,
};

export default GamesFilters;
