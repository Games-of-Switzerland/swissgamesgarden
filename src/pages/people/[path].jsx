import React from 'react';
import NotFound from 'components/NotFound';
import {PersonDetail} from 'components/Person';
import {prefetchPerson, usePerson} from 'api/person';
import Loading from 'components/Loading';
import Error from 'components/Error';

const People = ({path}) => {
  const {data, isLoading, isError, error} = usePerson(path);

  if (isLoading) return <Loading />;
  if (isError) return <Error message={error?.message} />;

  return data ? <PersonDetail {...data} /> : <NotFound />;
};

export const getServerSideProps = prefetchPerson;

export default People;
