import React from 'react';
import {fetchGame} from 'lib/api';
import Layout from 'components/Layout';
import {GameDetail} from 'components/Game';

const Game = ({game}) => (
  <Layout>
    <GameDetail game={game} />
  </Layout>
);

export const getServerSideProps = async ({query}) => {
  const game = await fetchGame(query.path);
  return {props: {game: game[0]}};
};

export default Game;
