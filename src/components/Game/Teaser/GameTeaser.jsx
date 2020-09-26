import React from 'react';

const GameTeaser = ({game}) => {
  const {title} = game;
  return <div className="bg-white">{title}</div>;
};

export default GameTeaser;
