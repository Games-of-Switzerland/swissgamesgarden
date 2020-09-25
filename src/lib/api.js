import {deserialise, query} from 'kitsu-core';
import config from 'config';

const request = async (queryUrl, model, type = 'node') => {
  const res = await fetch(
    `${config.host}${config.api}/${type}/${model}${queryUrl && `?${queryUrl}`}`
  );
  return await res.json();
};

export const fetchGames = async () => {
  const queryUrl = query({});
  const data = await request(queryUrl, 'game');
  return await deserialise(data).data;
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

  const data = await request(queryUrl, 'game');
  return await deserialise(data).data;
};
