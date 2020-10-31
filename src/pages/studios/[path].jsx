import React from 'react';
import NotFound from 'components/NotFound';
import {StudioDetail} from 'components/Studio';
import {useStudio, prefetchStudio} from 'api/studio';

const Game = ({path}) => {
  const {data, isLoading, isError, error} = useStudio(path);

  if (isLoading) return <p>Loading</p>;
  if (isError) return <p>{error}</p>;

  return data ? <StudioDetail {...data} /> : <NotFound />;
};

export const getServerSideProps = prefetchStudio;

export default Game;
