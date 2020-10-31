import React from 'react';
import NotFound from 'components/NotFound';
import {PersonDetail} from 'components/Person';
import {usePerson, prefetchPerson} from 'api/person';

const People = ({path}) => {
  const {data, isLoading, isError, error} = usePerson(path);

  if (isLoading) return <p>Loading</p>;
  if (isError) return <p>{error}</p>;

  return data ? <PersonDetail {...data} /> : <NotFound />;
};

export const getServerSideProps = prefetchPerson;

export default People;
