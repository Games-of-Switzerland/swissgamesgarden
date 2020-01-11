import React, {useEffect, useState} from 'react'
import Layout from '../containers/Layout';
import Results from "../components/Results";
import {
  Hits,
  HitsStats,
  InitialLoader,
  NoHits,
  PageSizeAccessor,
  Pagination,
  SearchBox,
  SearchkitManager,
  SearchkitProvider,
  SelectedFilters,
  SortingSelector
} from "searchkit";
import ResultsFilters from "../components/Results/ResultsFilters";
import LoadMore from "../components/LoadMore";

const queryUrl = `http://localhost:9200/gos_node_game`;

const Stats = ({hitsCount}) => (
  <p className="mb-spacer lead" data-qa="hits-stats">
    <strong data-qa="info">{hitsCount} games</strong>
  </p>
);

const pageSize = 1;
const searchkit = new SearchkitManager(queryUrl);

const Home = () => (
    <Layout>
      <SearchkitProvider searchkit={searchkit}>
        <div>
          <SearchBox
            searchOnChange={true}
            prefixQueryFields={['title^10', 'genres.name^1', 'studios.name^2']}
            mod="d-none"
          />

          <div>
            <HitsStats component={Stats}/>

            <SortingSelector options={[
              {
                label: 'Relevance',
                field: '_score',
                order: 'desc',
                defaultOption: true
              },
              {label: 'Title', field: 'title.raw', order: 'asc'},
            ]}/>
          </div>

          <ResultsFilters/>

          <Hits
            listComponent={Results}
            hitsPerPage={pageSize}
          />
          <NoHits suggestionsField="title"/>

          <LoadMore/>

        </div>
      </SearchkitProvider>
    </Layout>
  );

export default Home;
