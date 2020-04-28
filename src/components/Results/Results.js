import React from 'react';
import PropTypes from 'prop-types';

import GameTeaser from '../GameTeaser/GameTeaser';

import './Results.scss';

const Results = ({hits}) => (
  <div>
    <div className="grid-results">
      {hits &&
        hits.map(({_source: game}) => <GameTeaser key={game.id} {...game} />)}
    </div>
  </div>
);

Results.propTypes = {
  hits: PropTypes.array.isRequired,
};

export default Results;
