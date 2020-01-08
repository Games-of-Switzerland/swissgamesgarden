import React from 'react';
import GameTeaser from "../GameTeaser/GameTeaser";

import './Results.scss';
import PropTypes from 'prop-types';
import ResultsFilters from "./ResultsFilters";

const Results = ({results}) => {
  const {hits: {hits}} = results;

  return (
    <div>
      <p className="lead">
        <strong>{results.hits.total} games</strong>
      </p>
      <ResultsFilters/>
      <div className="grid-results">
        {hits && hits.map(({_source: game}) => {
          return <GameTeaser key={game.id} {...game} />;
        })}
      </div>
    </div>
  );
};

Results.propTypes = {
  results: PropTypes.object.isRequired,
};

export default Results;
