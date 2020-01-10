import React from 'react';
import GameTeaser from "../GameTeaser/GameTeaser";

import './Results.scss';
import PropTypes from 'prop-types';

const Results = ({hits}) => (
  <div>
    <div className="grid-results">
      {hits && hits.map(({_source: game}) =>
        <GameTeaser key={game.id} {...game} />
      )}
    </div>
  </div>
);

Results.propTypes = {
  hits: PropTypes.array.isRequired,
};

export default Results;
