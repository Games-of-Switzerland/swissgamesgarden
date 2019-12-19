import React from 'react';
import GameTeaser from "../GameTeaser";
import {ReactiveList} from "@appbaseio/reactivesearch";

import './Results.scss';

const Results = () => (
  <ReactiveList
    componentId="SearchResult"
    dataField="title"
    react={{
      and: ['gameSearch'],
    }}
    render={({data}) => (
      <div className="grid-results">
        {data.map(item => {
          return <GameTeaser key={item.id} {...item} />;
        })}
      </div>
    )}
    loader="Loading Results.."
  />
);

export default Results;
