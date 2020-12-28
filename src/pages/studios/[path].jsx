import React from 'react';
import NotFound from 'components/NotFound';
import {StudioDetail} from 'components/Studio';
import {prefetchStudio, useStudio} from 'api/studio';
import Loading from 'components/Loading';
import Error from 'components/Error';

const Studio = ({path}) => {
  const {data, isLoading, isError, error} = useStudio(path);

  if (isLoading) return <Loading />;
  if (isError) return <Error message={error?.message} />;

  return data ? <StudioDetail {...data} /> : <NotFound />;
};

export const getServerSideProps = prefetchStudio;

export default Studio;
