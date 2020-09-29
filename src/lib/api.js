import {deserialise, query} from 'kitsu-core';
import config from 'config';

export const getGames = async (key, params = {}, page = 0) => {
  const queryUrl = query({...params, page});
  console.log(`%csearch query: ${queryUrl}`, 'font-weight:bold;');

  await new Promise(resolve => setTimeout(() => resolve(), 2000));

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

export const fetchGame = async field_path => {
  const queryUrl = query({
    filter: {
      field_path: `/games/${field_path}`,
    },
    fields: {
      'node--game': 'title,field_path,body,releases,genres',
      studios: 'title',
      'taxonomy_term--platform': 'name',
      genres: 'name',
    },
    include: 'releases',
  });

  const res = await fetch(`${config.host}${config.api}/node/game?${queryUrl}`);
  const data = await res.json();

  return await deserialise(data).data;
};
