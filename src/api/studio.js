import {QueryCache, useQuery} from 'react-query';
import {dehydrate} from 'react-query/hydration';
import {deserialise, query} from 'kitsu-core';

export const getStudio = async (key, field_path) => {
  // Get studio
  const studioQueryUrl = query({
    filter: {
      field_path: `/studios/${field_path}`,
    },
    fields: {
      'node--studio': 'title,body,members',
    },
    include: 'members',
  });

  const studioRes = await fetch(
    `${process.env.NEXT_PUBLIC_JSONAPI}/node/studio?${studioQueryUrl}`
  ).catch(err => {
    console.log(err);
  });
  const dataStudio = await studioRes.json();
  const studio = await deserialise(dataStudio).data[0];

  ////////////////////////
  // Get games from studio
  const gamesQueryUrl = query({
    filter: {
      'field_studios.field_path': `/studios/${field_path}`,
    },
    fields: {
      'node--game': 'title,field_path',
    },
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_JSONAPI}/node/game?${gamesQueryUrl}`
  ).catch(err => {
    console.log(err);
  });
  const dataGames = await res.json();
  const games = await deserialise(dataGames).data;

  return {games, studio};
};

export const useStudio = path => {
  return useQuery(['studio', path], getStudio);
};

export const prefetchStudio = async ({query}) => {
  const queryCache = new QueryCache();
  await queryCache.prefetchQuery(['studio', query.path], getStudio);

  return (
    queryCache && {
      props: {
        path: query.path,
        dehydratedState: dehydrate(queryCache),
      },
    }
  );
};
