import {getJsonApi} from 'config';
import {deserialise, query} from 'kitsu-core';
import {QueryClient, useQuery} from 'react-query';
import {dehydrate} from 'react-query/hydration';

export const getStudio = async ({queryKey}) => {
  // Get studio
  const studioQueryUrl = query({
    filter: {
      field_path: `/studios/${queryKey[1]}`,
    },
    fields: {
      'node--studio': 'title,body,members',
      'node--people': 'title,field_path',
    },
    include: 'members',
  });

  const studioRes = await fetch(
    `${getJsonApi()}/node/studio?${studioQueryUrl}`,
  ).catch(err => {
    console.log(err);
  });
  const dataStudio = await studioRes.json();
  const studio = await deserialise(dataStudio).data[0] || null;

  ////////////////////////
  // Get games from studio
  const gamesQueryUrl = query({
    filter: {
      'field_studios.field_path': `/studios/${queryKey[1]}`,
    },
    fields: {
      'node--game': 'title,field_path',
    },
  });

  const res = await fetch(
    `${getJsonApi()}/node/game?${gamesQueryUrl}`,
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
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['studio', query.path], getStudio, {});

  return (
    queryClient && {
      props: {
        path: query.path,
        dehydratedState: dehydrate(queryClient),
      },
    }
  );
};
