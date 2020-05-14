import React from 'react';
import Layout from 'components/Layout';
import {GetStaticPaths, GetStaticProps} from 'next';
import {getGames, getGame} from 'lib/games';

interface StudioProps {
  id: string;
  attributes: {
    title: string;
  };
}

export interface GameProps {
  data: {
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
  };
  included: StudioProps[];
}

const Game = (props: GameProps) => {
  const {
    data: {
      attributes: {title, body},
    },
    included: studios,
  } = props;

  return (
    <Layout>
      <div className="game-container">
        <div className="game-content">
          <div>
            {studios.map(studio => (
              <span key={studio.id}>{studio.attributes.title}</span>
            ))}
          </div>
          <h1>{title}</h1>
          <div dangerouslySetInnerHTML={{__html: body.processed}} />
        </div>
        <div className="game-images"></div>
        <div className="game-info"></div>
      </div>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const games = await getGames();
  const paths = games.data.map((game: GameProps) => ({
    params: {id: game.id},
  }));

  return {paths, fallback: false};
};

export const getStaticProps: GetStaticProps = async ({params = {}}) => {
  const game = await getGame(params.id);
  return {props: game};
};

export default Game;
