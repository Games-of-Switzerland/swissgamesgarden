import React from 'react';
import {GameDetail} from 'components/Game';
import NotFound from 'components/NotFound';
import {prefetchGame, useGame} from 'api/game';
import Loading from 'components/Loading';
import Error from 'components/Error';

const Game = ({path}) => {
  const {data, isLoading, isError, error} = useGame(path);

  if (isLoading) return <Loading />;
  if (isError) return <Error message={error?.message} />;

  return data ? <GameDetail game={data} /> : <NotFound />;
};

export const getServerSideProps = prefetchGame;

export default Game;
