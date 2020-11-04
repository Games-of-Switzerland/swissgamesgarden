import {QueryCache, useQuery} from 'react-query';
import {dehydrate} from 'react-query/hydration';
import {deserialise, query} from 'kitsu-core';

export const getPerson = async (key, field_path) => {
  // Get studio
  const personQueryUrl = query({
    filter: {
      field_path: `/people/${field_path}`,
    },
    fields: {
      'node--people': 'title,body',
    },
  });

  const personRes = await fetch(
    `${process.env.NEXT_PUBLIC_JSONAPI}/node/people?${personQueryUrl}`
  ).catch(err => {
    console.log(err);
  });
  const dataPerson = await personRes.json();
  const person = await deserialise(dataPerson).data[0];

  return {person};
};

export const usePerson = path => {
  return useQuery(['studio', path], getPerson);
};

export const prefetchPerson = async ({query}) => {
  const queryCache = new QueryCache();
  await queryCache.prefetchQuery(['person', query.path], getPerson);

  return (
    queryCache && {
      path: query.path,
      dehydratedState: dehydrate(queryCache),
    }
  );
};
