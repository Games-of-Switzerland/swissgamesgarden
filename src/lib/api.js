import {query, deserialise, deattribute} from 'kitsu-core';
import config from 'config';

const request = async (queryUrl, model, type = 'node') => {
  const res = await fetch(
    `${config.host}${config.api}/${type}/${model}?${queryUrl}`
  );
  return await res.json();
};

const normalizeData = data => {
  let cleanData = deserialise(data);
  console.log(deattribute(cleanData));
  cleanData.releases.data.map(release => {
    console.log(release);
    return release;
  });
  return cleanData.data[0];
};

export const fetchGame = async field_path => {
  const queryUrl = query({
    filter: {field_path: `/games/${field_path}`},
    fields: {
      'node--game': 'title,field_path,body,releases,genres',
      studios: 'title',
      'taxonomy_term--platform': 'name',
      genres: 'name',
    },
    include: 'releases',
  });

  return normalizeData(await request(queryUrl, 'game'));
};
