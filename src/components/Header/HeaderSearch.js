import React, {useRef, useState} from 'react';
import fetch from 'isomorphic-unfetch';
import {debounce} from 'throttle-debounce';
import Autosuggest from 'react-autosuggest';
import {useRouter} from 'next/router';
import config from '../../config';
import slugify from '../../utilities/slugify';

import './HeaderSearch.scss';

const queryParams = {
  mode: 'cors',
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

const getSuggestionData = suggestion => {
  switch (suggestion._index) {
    case 'gos_node_game':
      return {
        emoji: '🎮',
        highlight: suggestion.highlight.title,
        name: suggestion._source.title,
        kind: 'Game',
        urlBase: '/games/',
      };
    case 'gos_node_people':
      return {
        emoji: '🤓',
        highlight: suggestion.highlight.fullname,
        name: suggestion._source.fullname,
        kind: 'People',
        urlBase: '/people/',
      };
    case 'gos_node_studio':
      return {
        emoji: '🏢',
        highlight: suggestion.highlight.name,
        name: suggestion._source.name,
        kind: 'Studio',
        urlBase: '/studios/',
      };
    default:
      return {};
  }
};

const HeaderSearch = () => {
  const initialSuggestions = [];
  const [suggestions, setSuggestions] = useState(initialSuggestions);
  const [value, setValue] = useState('');
  const router = useRouter();
  const inputEl = useRef(null);

  const onSuggestionsFetchRequested = async ({value}) => {
    const query = {
      query: {
        multi_match: {
          query: value,
          type: 'phrase_prefix',
          fields: ['title^3', 'fullname', 'name'],
        },
      },
      sort: ['_score'],
      highlight: {
        fields: {
          title: {},
          fullname: {},
          name: {},
        },
      },
    };

    try {
      const response = await fetch(config.QUERY_SEARCH, {
        ...queryParams,
        body: JSON.stringify(query),
      });
      const results = await response.json();
      setSuggestions(results.hits.hits);
    } catch (error) {
      console.trace(error.message);
    }
  };

  const onSuggestionsClearRequested = () => setSuggestions(initialSuggestions);

  const renderSuggestion = suggestion => {
    const {highlight, emoji, kind} = getSuggestionData(suggestion);
    return (
      <>
        <span className="suggestion-icon">{emoji}</span>
        <span dangerouslySetInnerHTML={{__html: highlight}} />
        <span style={{marginLeft: 'auto'}}>{kind}</span>
      </>
    );
  };

  const getSuggestionValue = suggestion => getSuggestionData(suggestion).name;

  const onSuggestionSelected = (e, {suggestion}) => {
    const {urlBase, name} = getSuggestionData(suggestion);
    router.push(
      urlBase + suggestion._id,
      urlBase + slugify(name).toLowerCase()
    );
  };

  const inputProps = {
    placeholder: 'game, studio, person…',
    value,
    onChange: (e, {newValue}) => setValue(newValue),
    type: 'search',
  };

  return (
    <div className="header-search">
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={debounce(200, onSuggestionsFetchRequested)}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        renderSuggestion={renderSuggestion}
        getSuggestionValue={getSuggestionValue}
        onSuggestionSelected={onSuggestionSelected}
        ref={inputEl}
        inputProps={inputProps}
        // TODO remove this when fixed in react-autosuggestion https://github.com/moroshko/react-autosuggest/issues/738
        renderSectionTitle={() => {}}
        getSectionSuggestions={() => {}}
      />
    </div>
  );
};

export default HeaderSearch;
