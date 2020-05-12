import React from 'react';
import Layout from '../../containers/Layout';
import fetch from 'isomorphic-unfetch';
import Link from 'next/link';

const Game = ({data}) => {
  const {
    id,
    attributes: {
      title,
      path: {alias},
    },
  } = data;
  console.log(alias);

  return (
    <li>
      <Link href="/games/[id]" as={alias}>
        <a>{title}</a>
      </Link>
    </li>
  );
};

const Games = ({games}) => {
  if (!games) return null;
  return (
    <Layout>
      <ul>
        {games.map(game => (
          <Game key={game.id} data={game} />
        ))}
      </ul>
    </Layout>
  );
};

export async function getServerSideProps() {
  const res = await fetch(`${process.env.JSONAPI_URL}/node/game`);
  const games = await res.json();

  return {
    props: {games: games.data},
  };
}

export default Games;
