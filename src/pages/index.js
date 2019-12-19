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

  const getGames = async value => {
    const qq = {
      from: 0, // TODO Use this later for pagination.
      size:30,
      sort: ['_score'],
    };

    if (value) {
      qq.query = {
        fuzzy: {
          title: {
            value,
            fuzziness: 'AUTO',
          }
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
    } catch (error) {
      console.trace(error.message)
    }
  };

  // Load all games if no parameters
  // add parameter to URL when submitting search in searhc header
  useEffect(() => {
    getGames(query.s || '');
  }, [query]);


  return (
    <Layout>
      {results ? <Results results={results}/> : 'Loading...'}
    </Layout>
  );
};

export default withRouter(Home);
