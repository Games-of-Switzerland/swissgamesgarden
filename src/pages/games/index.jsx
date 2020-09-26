import React from 'react';
import {fetchGames} from 'lib/api';
import Layout from 'components/Layout';
import Link from 'next/link';
import {GameTeaser} from 'components/Game';

const Games = ({games}) =>
  games ? (
    <Layout>
      {games.map(game => (
        <GameTeaser game={game} key={game.id} />
      ))}
    </Layout>
  ) : (
    <Layout>
      <p>No games to show</p>
    </Layout>
  );

export const getServerSideProps = async () => {
  const games = await fetchGames();
  return {props: {games}};
};

export default Games;
