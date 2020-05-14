import React from 'react';
import Layout from 'components/Layout';
import Link from 'next/link';
import {GetServerSideProps} from 'next';
import {GameProps} from './[id]';

const GameListItem = (props: GameProps) => {
  const {
    attributes: {
      title,
      path: {alias},
    },
  } = props;

  return (
    <li>
      <Link href="/games/[id]" as={alias}>
        <a>{title}</a>
      </Link>
    </li>
  );
};

interface Props {
  games: GameProps[];
}

const Games = ({games}: Props) => {
  if (!games) return null;
  return (
    <Layout>
      <ul>
        {games.map(game => (
          <GameListItem key={game.id} {...game} />
        ))}
      </ul>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_JSONAPI_URL}/node/game`);
  const games = await res.json();

  return {
    props: {games: games.data},
  };
};

export default Games;
