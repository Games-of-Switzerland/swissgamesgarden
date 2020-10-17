import {deserialise, query} from 'kitsu-core';
import config from 'config';

export const getGames = async (key, params = {}, page = 0) => {
  const queryUrl = query({...params, page});
  console.log(`%csearch query: ${queryUrl}`, 'font-weight:bold;');

  // Get games from server
  const res = await fetch(
    `${config.host}${config.elasticsearch}/games?${queryUrl}`
  );
  const data = await res.json();

  // Set next page index for next call
  const hasNextPage = data.hits.total > data.hits.hits.length * (page + 1);
  data.page = page;
  data.nextPage = hasNextPage ? page + 1 : false;

  return deserialise(data);
};

export const getGame = async (key, field_path) => {
  const queryUrl = query({
    filter: {
      field_path: `/games/${field_path}`,
    },
    fields: {
      'node--game':
        'title,body,genres,studios,genres,releases_normalized,release_platforms,website,locations,publishers,sponsors,social_networks,languages,awards,credits,completeness,members',
      studios: 'title',
      'node--studio': 'title',
      'taxonomy_term--genre': 'slug',
      'taxonomy_term--platform': 'slug',
      'taxonomy_term--location': 'name',
      'taxonomy_term--publisher': 'name',
      'taxonomy_term--sponsor': 'name',
      'taxonomy_term--language': 'name',
      'taxonomy_term--member': 'name',
    },
    include:
      'studios,release_platforms,genres,locations,publishers,sponsors,languages,members',
  });

  console.log(`%cnode query: /node/game?${queryUrl}`, 'font-weight:bold;');

  const res = await fetch(`${config.host}${config.api}/node/game?${queryUrl}`);
  const data = await res.json();

  return await deserialise(data).data[0];
};
