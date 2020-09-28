import React from 'react';
import {fetchGames} from 'lib/api';
import Layout from 'components/Layout';
import {GameTeaser} from 'components/Game';
import ErrorBoundary from 'components/ErrorBoundary';

const Games = ({games}) => {
  return games ? (
    <Layout>
      <ErrorBoundary>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {games.map(({_source: game}) => (
            <GameTeaser game={game} key={game.id} />
          ))}
        </div>
      </ErrorBoundary>
    </Layout>
  ) : (
    <Layout>
      <p>No games to show</p>
    </Layout>
  );
};

export const getServerSideProps = async () => {
  const games = await fetchGames();
  return {props: {games}};
};

export default Games;
