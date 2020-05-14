import React from 'react';
import Layout from '../../components/Layout';
import {GetServerSideProps} from 'next';

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

export const getServerSideProps: GetServerSideProps = async context => {
  const id = 'a0b7c853-c891-487f-84f9-74dfbce9fa63';
  const res = await fetch(`${process.env.JSONAPI_URL}/node/game/${id}`);
  const game = await res.json();
  return {
    props: game.data,
  };
};

export default Game;
