import React from 'react';
import {GameDetail} from 'components/Game';
import NotFound from 'components/NotFound';
import {prefetchGame, useGame} from 'api/game';
import Layout from 'components/Layout';

const Game = ({path}) => {
  const {data, isLoading, isError, error} = useGame(path);

  if (isLoading) return <p>Loading</p>;
  if (isError) return <p>{error}</p>;

  return <Layout>{data ? <GameDetail game={data} /> : <NotFound />}</Layout>;
};

export const getServerSideProps = prefetchGame;

export default Game;
