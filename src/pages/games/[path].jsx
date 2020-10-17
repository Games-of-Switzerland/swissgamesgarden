import React from 'react';
import {getGame} from 'lib/api';
import Layout from 'components/Layout';
import {GameDetail} from 'components/Game';
import {QueryCache, useQuery} from 'react-query';
import {dehydrate} from 'react-query/hydration';

const Game = ({path}) => {
  const {data, isLoading} = useQuery(['game', path], getGame);

  return <Layout>{data && <GameDetail game={data} />}</Layout>;
};

export const getServerSideProps = async ({query}) => {
  const queryCache = new QueryCache();

  await queryCache.prefetchQuery(['game', query.path], getGame);

  return {
    props: {
      path: query.path,
      dehydratedState: dehydrate(queryCache),
    },
  };
};

export default Game;
