import React from 'react';
import GameTeaser from "../GameTeaser";
import {ReactiveList} from "@appbaseio/reactivesearch";

import './Results.scss';

const Results = props => {
  // temp data
  const game = {
    id: 123,
    img: {
      sm: '//placehold.it/160x90',
      md: '//placehold.it/160x90',
      lg: '//placehold.it/160x90',
    },
    studio: 'Kobold Games',
    year: 2018,
    title: 'uFin: The Challenge',
    platforms: ['PC', 'PS4', 'Xbox One'],
    genres: ['Puzzle', 'Reflexion'],
    players: [1,2],
  };

  return (
    <ReactiveList
      componentId="SearchResult"
      dataField="title"
      {...props}
      render={({ data }) => (
        <div className="grid-results">
          {data.map(item => <GameTeaser key={item.id} game={game} />)}

        </div>
      )}
      loader="Loading Results.."
    />
  );
};

export default Results;
