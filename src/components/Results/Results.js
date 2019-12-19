import React from 'react';
import GameTeaser from "../GameTeaser";

import './Results.scss';
import PropTypes from 'prop-types';

const Results = ({results}) => (
  <div className="grid-results">
    {results && results.map(({_source: game}) => {
      return <GameTeaser key={game.id} {...game} />;
    })}
  </div>
);

Results.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Results;
