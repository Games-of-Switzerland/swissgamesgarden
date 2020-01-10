import React, {useEffect, useState} from 'react'
import Layout from '../containers/Layout';
import Results from "../components/Results";
import fetch from "isomorphic-unfetch";
import {withRouter} from "next/router";
import {
  Hits, HitsStats, SearchBox,
  SearchkitManager,
  SearchkitProvider
} from "searchkit";
import ResultsFilters from "../components/Results/ResultsFilters";

const queryUrl = `http://localhost:9200/gos_node_game`;

const Stats = ({hitsCount}) => (
  <p className="mb-spacer" data-qa="hits-stats">
    <strong data-qa="info">{hitsCount} games</strong>
  </p>
);

const Home = ({router: {query}}) => {
  const searchkit = new SearchkitManager(queryUrl);

  return (
    <Layout>
      <SearchkitProvider searchkit={searchkit}>
        <div>
          <SearchBox
            searchOnChange={true}
            prefixQueryFields={['title^10', 'genres.name^1', 'studios.name^2']}
            mod="d-none"
          />
          <HitsStats component={Stats}/>
          <ResultsFilters/>
          <Hits listComponent={Results}/>
        </div>
      </SearchkitProvider>
    </Layout>
  );
};

export default withRouter(Home);
