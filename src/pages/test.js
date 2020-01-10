import React from "react";
import {
  Hits,
  HitsStats,
  RefinementListFilter,
  SearchBox,
  SearchkitManager,
  SearchkitProvider
} from "searchkit";
import GameTeaser from "../components/GameTeaser";

const List = ({hits}) => (
  <ul>
    {hits.map(hit => <GameTeaser key={hit._id} {...hit._source}/>)}
  </ul>
);

const searchkit = new SearchkitManager('http://localhost:9200/gos_node_game');

const Test = () => {
  return (
    <div>
      <SearchkitProvider searchkit={searchkit}>
        <div>
          <SearchBox
            searchOnChange={true}
            prefixQueryFields={['title^10', 'genres.name^1', 'studios.name^2']}
          />
          <RefinementListFilter id="genres" title="Genres" field="genres.name.raw" operator="AND"/>
          <RefinementListFilter id="studios" title="Studios" field="studios.name.raw" fieldOptions={{type: 'nested', options: {path: 'studios'}}} operator="AND"/>
          <Hits listComponent={List} />
          <HitsStats/>
        </div>
      </SearchkitProvider>
    </div>
  )
};

export default Test;
