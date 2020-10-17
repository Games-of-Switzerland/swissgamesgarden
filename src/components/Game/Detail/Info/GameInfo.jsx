import React from 'react';
import PropTypes from 'prop-types';

const GameInfo = ({title, children}) =>
  children ? (
    <div className="mb-8">
      <h3 className="text-md font-light text-gray-500 mb-1">{title}</h3>
      <div className="text-lg">{children}</div>
    </div>
  ) : null;

GameInfo.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default GameInfo;
