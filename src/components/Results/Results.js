import React from 'react';
import GameTeaser from "../GameTeaser";

import './Results.scss';

const Results = ({results}) => (
  <div className="grid-results">
    {results && results.map(item => {
      return <GameTeaser key={item.id} {...item} />;
    })}
  </div>
);

export default Results;
