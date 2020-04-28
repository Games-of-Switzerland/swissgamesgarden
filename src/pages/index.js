import React from 'react';
import Layout from '../containers/Layout';
import Results from '../components/Results';
import {
  Hits,
  NoHits,
  SearchBox,
  SearchkitManager,
  SearchkitProvider,
  SortingSelector,
} from 'searchkit';
import config from '../config';
import Stats from '../components/ElasticSearch/Stats';
import ResultsFilters from '../components/Results/ResultsFilters';

const searchkit = new SearchkitManager(config.QUERY_URL);

const Home = () => (
  <Layout>
    <SearchkitProvider searchkit={searchkit}>
      <div>
        <SearchBox
          searchOnChange={true}
          prefixQueryFields={['title^10', 'genres.name^1', 'studios.name^2']}
          mod="d-none"
        />

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

        {/*<LoadMore/>*/}
      </div>
    </SearchkitProvider>
  </Layout>
);

export default Home;
