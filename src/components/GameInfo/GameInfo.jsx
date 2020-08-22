import React from 'react';
import PropTypes from 'prop-types';

const GameInfo = ({title, children}) => (
  <div className="game-info-item">
    <h3>{title}</h3>
    {children}
  </div>
);

GameInfo.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default GameInfo;
