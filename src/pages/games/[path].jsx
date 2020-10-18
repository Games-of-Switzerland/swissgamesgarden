import React from 'react';
import {getGame} from 'lib/api';
import Layout from 'components/Layout';
import {GameDetail} from 'components/Game';
import {QueryCache, useQuery} from 'react-query';
import {dehydrate} from 'react-query/hydration';
import NotFound from 'components/NotFound';

const Game = ({path}) => {
  const {data, isLoading, isError, error} = useQuery(['game', path], getGame);

  if (isLoading) return <p>Loading</p>;
  if (isError) return <p>{error}</p>;

  return <Layout>{data ? <GameDetail game={data} /> : <NotFound />}</Layout>;
};

export const getServerSideProps = async ({query}) => {
  const queryCache = new QueryCache();

  await queryCache.prefetchQuery(['game', query.path], getGame);

  return (
    queryCache && {
      props: {
        path: query.path,
        dehydratedState: dehydrate(queryCache),
      },
    }
  );
};

export default Game;
