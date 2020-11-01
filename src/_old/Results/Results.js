import React from 'react';
import PropTypes from 'prop-types';

import GameTeaser from 'GameTeaser/GameTeaser';

const Results = ({hits}) => (
  <div className="grid-results">
    {hits.map(({_source: game}) => (
      <GameTeaser key={game.id} {...game} />
    ))}
  </div>
);

Results.propTypes = {
  hits: PropTypes.array.isRequired,
};

export default Results;
