import React, {Fragment, useEffect, useRef, useState} from 'react';
import {debounce} from 'throttle-debounce';
import Autosuggest from 'react-autosuggest';
import {useRouter} from 'next/router';
import slugify from 'utils/slugify';

const getSuggestionData = hit => {
  switch (hit._source.bundle) {
    case 'game':
      return {
        emoji: '🎮',
        text: hit._source.title,
        kind: 'Game',
        path: hit._source.path,
      };
    case 'people':
      return {
        emoji: '🤓',
        text: hit._source.fullname,
        kind: 'People',
        path: hit._source.path,
      };
    case 'studio':
      return {
        emoji: '🏢',
        text: hit._source.name,
        kind: 'Studio',
        path: hit._source.path,
      };
    default:
      return {};
  }
};

const AutoSuggest = props => {
  const initialSuggestions = [];
  const [suggestions, setSuggestions] = useState(initialSuggestions);
  const [value, setValue] = useState('');
  const router = useRouter();
  const inputEl = useRef(null);

  // Autosuggest will call this function every time you need to update suggestions.
  const onSuggestionsFetchRequested = async ({value}) => {
    if (value.length === 0) return initialSuggestions;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_AUTOCOMPLETE_URL}?q=${value}`
      );
      const results = await response.json();
      const suggestionsResults = results.aggregations.bundles.bundle.buckets
        .reduce((acc, bucket) => [...acc, ...bucket.top.hits.hits], [])
        .sort((a, b) => a._score > b._score);
      setSuggestions(suggestionsResults);
    } catch (error) {
      console.trace(error.message);
    }
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  const onSuggestionsClearRequested = () => setSuggestions(initialSuggestions);

  // Render result
  const renderSuggestion = hit => {
    const {text, emoji, kind} = getSuggestionData(hit);
    return (
      <>
        <span className="suggestion-icon">{emoji}</span>
        <span>{text}</span>
        <span style={{marginLeft: 'auto'}}>{kind}</span>
      </>
    );
  };

  const getSuggestionValue = hit => getSuggestionData(hit).text;

  const onSuggestionSelected = (e, {suggestion}) => {
    const {path} = getSuggestionData(suggestion);
    router.push(path);
  };

  const handleChange = (e, {newValue}) => setValue(newValue);

  const inputProps = {
    placeholder: 'game, studio, person…',
    value,
    onChange: handleChange,
    type: 'search',
  };

  return (
    <div {...props}>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={debounce(200, onSuggestionsFetchRequested)}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        renderSuggestion={renderSuggestion}
        getSuggestionValue={getSuggestionValue}
        onSuggestionSelected={onSuggestionSelected}
        ref={inputEl}
        inputProps={inputProps}
      />
    </div>
  );
};

export default AutoSuggest;
