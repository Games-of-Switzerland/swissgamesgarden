import {deserialise, query} from 'kitsu-core';
import {QueryCache, useQuery} from 'react-query';
import {dehydrate} from 'react-query/hydration';

export const getGame = async (key, field_path) => {
  const queryUrl = query({
    filter: {
      field_path: `/games/${field_path}`,
    },
    fields: {
      'node--game':
        'title,body,genres,studios,genres,releases_normalized,release_platforms,website,locations,publishers,sponsors,social_networks,languages,awards,credits,completeness,members,images,contextual_links',
      studios: 'title',
      'node--studio': 'title',
      'node--people': 'title',
      'taxonomy_term--genre': 'slug',
      'taxonomy_term--platform': 'slug',
      'taxonomy_term--location': 'name',
      'taxonomy_term--publisher': 'name',
      'taxonomy_term--sponsor': 'name',
      'taxonomy_term--language': 'name',
      'taxonomy_term--member': 'name',
    },
    include:
      'studios,release_platforms,genres,locations,publishers,sponsors,languages,members,images',
  });

  // console.log(`%cnode query: /node/game?${queryUrl}`, 'font-weight:bold;');

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_JSONAPI}/node/game?${queryUrl}`
  ).catch(err => {
    console.log(err);
  });
  const data = await res.json();

  return (await deserialise(data).data[0]) || null;
};

export const useGame = path => {
  return useQuery(['game', path], getGame);
};

export const prefetchGame = async ({query}) => {
  const queryCache = new QueryCache();
  await queryCache.prefetchQuery(['game', query.path], getGame);

  return (
    queryCache && {
      path: query.path,
      dehydratedState: dehydrate(queryCache),
    }
  );
};
