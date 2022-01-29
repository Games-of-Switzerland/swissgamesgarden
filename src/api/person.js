import {deserialise, query} from 'kitsu-core';
import {QueryClient, useQuery} from 'react-query';
import {dehydrate} from 'react-query/hydration';

export const getPerson = async ({queryKey}) => {
  // Get studio
  const personQueryUrl = query({
    filter: {
      field_path: `/people/${queryKey[1]}`,
    },
    fields: {
      'node--people': 'title,body'
    },
  });

  const personRes = await fetch(
    `${process.env.NEXT_PUBLIC_JSONAPI}/node/people?${personQueryUrl}`
  ).catch(err => {
    console.log(err);
  });
  const dataPerson = await personRes.json();
  const person = (await deserialise(dataPerson).data[0]) || null

  ////////////////////////
  // Get games from person
  const gamesQueryUrl = query({
    filter: {
      'field_members.field_path': `/people/${queryKey[1]}`,
    },
    fields: {
      'node--game': 'title,field_path',
    }
  });

  const gameRes = await fetch(
    `${process.env.NEXT_PUBLIC_JSONAPI}/node/game?${gamesQueryUrl}`
  ).catch(err => {
    console.log(err);
  });
  const dataGames = await gameRes.json();
  const games = await deserialise(dataGames).data;

  ////////////////////////
  // Get studios from person
  const studiosQueryUrl = query({
    filter: {
      'field_members.field_path': `/people/${queryKey[1]}`,
    },
    fields: {
      'node--studio': 'title,field_path',
    },
  });

  const studioRes = await fetch(
    `${process.env.NEXT_PUBLIC_JSONAPI}/node/studio?${studiosQueryUrl}`
  ).catch(err => {
    console.log(err);
  });
  const dataStudios = await studioRes.json();
  const studios = await deserialise(dataStudios).data;

  return {games, person, studios}
};

export const usePerson = path => {
  return useQuery(['person', path], getPerson);
};

export const prefetchPerson = async ({query}) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['person', query.path], getPerson, {});

  return (
    queryClient && {
      props: {
        path: query.path,
        dehydratedState: dehydrate(queryClient),
      },
    }
  );
};
