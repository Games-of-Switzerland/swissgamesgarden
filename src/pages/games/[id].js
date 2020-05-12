import React from 'react';
import Layout from '../../containers/Layout';
import fetch from 'isomorphic-unfetch';
import {useRouter} from 'next/router';

const Game = ({attributes}) => {
  const {title, body} = attributes;

  return (
    <Layout>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{__html: body.processed}} />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  console.log(context);

  const id = 'a0b7c853-c891-487f-84f9-74dfbce9fa63';
  const res = await fetch(`${process.env.JSONAPI_URL}/node/game/${id}`);
  const game = await res.json();

  return {
    props: game.data,
  };
}

export default Game;
