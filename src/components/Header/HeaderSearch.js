import React, {useRef, useState} from 'react';
import fetch from 'isomorphic-unfetch';
import {debounce} from 'throttle-debounce';
import Autosuggest from 'react-autosuggest';
import {useRouter} from 'next/router';
import slugify from '../../utilities/slugify';

const queryParams = {
  method: 'GET',
};

const getSuggestionData = suggestion => {
  switch (suggestion._index) {
    case 'gos_node_game':
    case 'development_gos_node_game_en':
      return {
        emoji: '🎮',
        highlight: suggestion.highlight.title || suggestion._source.title,
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
    try {
      const response = await fetch(process.env.ELASTIC_URL, queryParams);
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
        // // TODO remove this when fixed in react-autosuggestion https://github.com/moroshko/react-autosuggest/issues/738
        renderSectionTitle={() => {}}
        getSectionSuggestions={() => {}}
      />
    </div>
  );
};

export default HeaderSearch;
