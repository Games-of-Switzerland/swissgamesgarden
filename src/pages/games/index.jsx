import React from 'react';
import Layout from 'components/Layout';
import Link from 'next/link';
import {getGames} from '../../lib/games';

const Games = ({games}) =>
  games ? (
    <Layout>
      <ul>
        {games.map(game => (
          <li data-testid="game-teaser" key={game.id}>
            <Link href="/games/[path]" as={game.attributes.field_path}>
              <a>{game.attributes.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  ) : (
    <Layout>
      <p>No games to show</p>
    </Layout>
  );

export const getServerSideProps = async () => {
  const games = await getGames();

  return {
    props: {games: games.data},
  };
};

export default Games;
