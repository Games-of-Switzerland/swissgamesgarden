import React, {useEffect, useState} from 'react'
import Layout from '../containers/Layout';
import Results from "../components/Results";
import fetch from "isomorphic-unfetch";
import {withRouter} from "next/router";

const queryUrl = `http://localhost:9200/gos_node_game/_search`;
const queryParams = {
  mode: 'cors',
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
};

const Home = ({router: {query}}) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const getGames = async value => {
    const qq = {
      from: 0, // TODO Use this later for pagination.
      size:30,
      sort: ['_score'],
    };

    if (value) {
      qq.query = {
        multi_match: {
          query: value,
          type: 'phrase_prefix',
          fields: ['title^3'],
        },
      };
    } else {
      qq.query = {
        match_all: {},
      };
    }

    try {
      const response = await fetch(queryUrl, {
        ...queryParams,
        body: JSON.stringify(qq)
      });
      const results = await response.json();
      setResults(results.hits.hits);
      setLoading(false);
    } catch (error) {
      console.trace(error.message)
    }
  };

  // Load games from URL or all.
  useEffect(() => {
    getGames(query.s || '');
  }, [query]);

  const ResultGrid = results.length ? <Results results={results}/> : <div style={{color: 'var(--white)'}}>No results</div>;

  return (
    <Layout>
      {loading ? <div style={{color: 'var(--white)'}}>Loading...</div> : ResultGrid}
    </Layout>
  );
};

export default withRouter(Home);
