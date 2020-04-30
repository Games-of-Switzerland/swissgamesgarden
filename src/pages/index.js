import React from 'react';
import Layout from '../containers/Layout';
import Results from '../components/Results';
import {Hits, InitialLoader, NoHits, SortingSelector} from 'searchkit';
import config from '../config';
import Stats from '../components/ElasticSearch/Stats';
import ResultsFilters from '../components/Results/ResultsFilters';
import LoadMore from '../components/LoadMore';

const Home = () => (
  <Layout>
    <div className="d-flex d-flex-gap">
      <Stats />

      <SortingSelector
        className="form-select"
        options={[
          {
            label: 'Relevance',
            field: '_score',
            order: 'desc',
            defaultOption: true,
          },
          {label: 'Title', field: 'title.raw', order: 'asc'},
        ]}
      />
    </div>

    <ResultsFilters />

    <Hits listComponent={Results} hitsPerPage={config.PAGE_SIZE} />
    <NoHits suggestionsField="title" />
    <InitialLoader />

    <LoadMore />
  </Layout>
);

export default Home;
