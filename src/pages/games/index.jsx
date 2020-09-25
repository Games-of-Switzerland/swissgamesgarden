import React from 'react';
import {fetchGames} from 'lib/api';
import Layout from 'components/Layout';
import Link from 'next/link';

const Games = ({games}) =>
  games ? (
    <Layout>
      <ul>
        {games.map(({title, id, field_path}) => (
          <li data-testid="game-teaser" key={id}>
            <Link href="/games/[path]" as={field_path}>
              <a>{title}</a>
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
  const games = await fetchGames();
  return {props: {games}};
};

export default Games;
