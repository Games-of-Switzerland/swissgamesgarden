import {deserialise, query} from 'kitsu-core';
import config from 'config';

export const fetchGames = async () => {
  const queryUrl = query({page: 0});
  const res = await fetch(
    `${config.host}${config.elasticsearch}/games?${queryUrl}`
  );
  const data = await res.json();
  return deserialise(data).hits.hits;
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
