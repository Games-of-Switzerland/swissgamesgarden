import React, {useState} from 'react';
import Dropdown from 'components/Dropdown';
import PropTypes from 'prop-types';
import {FILTERS} from 'config';

const GamesFilters = ({filters, setFilter}) => {
  // TODO improve this mess...
  const platforms =
    filters.all_filtered_platforms?.all_nested_platforms.platforms_name_keyword
      .buckets || [];
  // const stores =
  //   filters.all_filtered_stores?.all_nested_stores.stores_name_keyword
  //     .buckets || [];
  // const releases =
  //   filters.all_filtered_release_years_histogram?.all_nested_release_years
  //     .releases_over_time.buckets || [];
  // const locations =
  //   filters.all_filtered_locations?.all_nested_locations.locations_name_keyword
  //     .buckets || [];
  // const genres =
  //   filters.all_filtered_genres?.all_nested_genres.genres_name_keyword
  //     .buckets || [];

  const [selectedPlatforms, setSelectedPlatforms] = useState(platforms);

  const handleClick = key => {
    setSelectedPlatforms(prev => [...prev, key]);
    setFilter(FILTERS.PLATFORMS, [key]);
  };

  return (
    <div className="text-white">
      <div>{selectedPlatforms.map(({key}) => key)}</div>

      <Dropdown title="Platforms">
        {platforms.map(({key, doc_count}) => (
          <div
            key={key}
            onClick={() => handleClick(key)}
            className={
              selectedPlatforms.find(p => p.key === key) ? 'bg-red-500' : null
            }
          >
            {key} ({doc_count})
          </div>
        ))}
      </Dropdown>

      {/*<Dropdown title="Genres">*/}
      {/*  {genres.map(({key, doc_count}) => (*/}
      {/*    <div key={key}>*/}
      {/*      {key} ({doc_count})*/}
      {/*    </div>*/}
      {/*  ))}*/}
      {/*</Dropdown>*/}

      {/*<Dropdown title="Locations">*/}
      {/*  {locations.map(({key, doc_count}) => (*/}
      {/*    <div key={key}>*/}
      {/*      {key} ({doc_count})*/}
      {/*    </div>*/}
      {/*  ))}*/}
      {/*</Dropdown>*/}

      {/*<Dropdown title="Stores">*/}
      {/*  {stores.map(({key, doc_count}) => (*/}
      {/*    <div key={key}>*/}
      {/*      {key} ({doc_count})*/}
      {/*    </div>*/}
      {/*  ))}*/}
      {/*</Dropdown>*/}

      {/*<Dropdown title="Releases">*/}
      {/*  {releases.map(({key_as_string, key, doc_count}) => (*/}
      {/*    <div key={key}>*/}
      {/*      {key_as_string} ({doc_count})*/}
      {/*    </div>*/}
      {/*  ))}*/}
      {/*</Dropdown>*/}
    </div>
  );
};

GamesFilters.propTypes = {
  filters: PropTypes.object.isRequired,
};

export default GamesFilters;
