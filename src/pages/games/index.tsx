import React from 'react';
import Layout from 'components/Layout';
import Link from 'next/link';
import {GetServerSideProps} from 'next';
import {GameProps} from './[id]';
import {getGames} from 'lib/games';

interface Props {
  games: GameProps[];
}

const Games = ({games}: Props) => {
  if (!games) return <div>No games to show</div>;
  return (
    <Layout>
      <ul>
        {games.map(game => (
          <li key={game.id}>
            <Link href="/games/[id]" as={`/games/${game.id}`}>
              <a>{game.attributes.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const games = await getGames();

  return {
    props: {games: games.data},
  };
};

export default Games;
