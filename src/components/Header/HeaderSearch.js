import React, {useEffect, useRef, useState} from "react";
import fetch from "isomorphic-unfetch";
import {throttle, debounce} from 'throttle-debounce';
import Autosuggest from 'react-autosuggest';
import Router, {useRouter} from "next/router";

import './HeaderSearch.scss';

const queryUrl = `http://localhost:9200/_search`;
const queryParams = {
  mode: 'cors',
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
};

const HeaderSearch = () => {
  const initialSuggestions = [];
  const [suggestions, setSuggestions] = useState(initialSuggestions);
  const [q, setQ] = useState('');
  const router = useRouter();
  const inputEl = useRef(null);

  const onSuggestionsFetchRequested = async ({value}) => {
    const qq = {
      query: {
        multi_match: {
          query: value,
          type: 'phrase_prefix',
          fields: ['title^3', 'fullname', 'name'],
        },
      },
      sort: ['_score'],
      highlight : {
        fields : {
          title : {},
          fullname : {},
          name : {},
        }
      }
    };

    try {
      const response = await fetch(queryUrl, {
        ...queryParams,
        body: JSON.stringify(qq)
      });
      const results = await response.json();
      setSuggestions(results.hits.hits);
    } catch (error) {
      console.trace(error.message)
    }
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions(initialSuggestions);
  };

  const renderSuggestion = suggestion => {
    let name = '';
    let emoji = '';
    let kind = '';

    switch (suggestion._index) {
      case 'gos_node_game':
        emoji = '🎮';
        name = suggestion.highlight.title;
        kind = 'Game';
        break;
      case 'gos_node_people':
        emoji = '🤓';
        name = suggestion.highlight.fullname;
        kind = 'People';
        break;
      case 'gos_node_studio':
        emoji = '🏢';
        name = suggestion.highlight.name;
        kind = 'Studio';
        break;
    }

    return (
      <>
        <span>{emoji}</span>
        <span dangerouslySetInnerHTML={{__html: name}}/>
        <span style={{marginLeft: 'auto'}}>{kind}</span>
      </>
    );
  };

  const getSuggestionValue = suggestion => {
    switch (suggestion._index) {
      case 'gos_node_game':
        return suggestion._source.title;
      case 'gos_node_people':
        return suggestion._source.fullname;
      case 'gos_node_studio':
        return suggestion._source.name;
    }
  };

  const handleEnter = e => {
    if (e.keyCode === 13) {
      const href = {
        pathname: router.pathname,
        query: { s: q },
      };
      // Go to the new URL.
      Router.push(href, href, { shallow: true });
      // Close suggestions.
      inputEl.current.input.blur()
    }
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={debounce(200, onSuggestionsFetchRequested)}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      on
      renderSuggestion={renderSuggestion}
      getSuggestionValue={getSuggestionValue}
      alwaysRenderSuggestions={true}
      ref={inputEl}
      inputProps={{
        placeholder: 'Search!',
        value: q,
        onChange: e => setQ(e.target.value),
        type: 'search',
        onKeyDown: handleEnter,
      }}
    />
  )
};

export default HeaderSearch;
