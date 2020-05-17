import React, {FunctionComponent} from 'react';

type GameInfoProps = {
  title: string;
};

const GameInfo: FunctionComponent<GameInfoProps> = ({title, children}) => (
  <div className="game-info-item">
    <h3>{title}</h3>
    {children}
  </div>
);

export default GameInfo;
