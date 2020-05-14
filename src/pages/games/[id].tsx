import React from 'react';
import Layout from 'components/Layout';
import {GetStaticPaths, GetStaticProps} from 'next';
import {getGames, getGame} from 'lib/games';

export interface GameProps {
  id: number;
  attributes: {
    title: string;
    body: {
      processed: string;
    };
    path: {
      alias: string;
    };
  };
}

const Game = ({attributes: {title, body}}: GameProps) => (
  <Layout>
    <h1>{title}</h1>
    <div dangerouslySetInnerHTML={{__html: body.processed}} />
  </Layout>
);

export const getStaticPaths: GetStaticPaths = async () => {
  const games = await getGames();
  const paths = games.data.map((game: GameProps) => ({
    params: {id: game.id},
  }));

  return {paths, fallback: false};
};

export const getStaticProps: GetStaticProps = async ({params = {}}) => {
  const game = await getGame(params.id);
  return {props: game.data};
};

export default Game;
