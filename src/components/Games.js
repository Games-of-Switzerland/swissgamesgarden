import React from 'react';
import fetch from "isomorphic-unfetch";
import GameTeaser from "./GameTeaser/GameTeaser";

const Games = ({games}) => {
  return (
    <div>
      {games.length > 0 && games.map(game => (
        <GameTeaser key={game._id} game={game._source}/>
      ))}
    </div>
  );
};

export default Games;
