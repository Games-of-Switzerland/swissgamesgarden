export const getGames = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_JSONAPI_URL}/node/game?fields[node--game]=title,field_path`
    );
    return await res.json();
  } catch (e) {
    return null;
  }
};

const normalizeGameData = data => {
  // Take the first result only.
  const result = data.data[0];
  const {
    id,
    attributes: {
      title,
      body: {processed: body},
      field_path: path,
    },
  } = result;

  const relationships = data.included.reduce(
    (out, item) => {
      switch (item.type) {
        case 'taxonomy_term--genre':
          // GENRES
          out.genres.push({
            id: item.id,
            name: item.attributes.name,
          });
          break;

        case 'node--studio':
          // STUDIOS
          out.studios.push({
            id: item.id,
            title: item.attributes.title,
          });
          break;

        case 'taxonomy_term--platform':
          // RELEASES
          // Fetch corresponding date value in relationships
          const meta = result.relationships.releases.data.find(
            r => r.id === item.id
          ).meta;
          out.releases.push({
            id: item.id,
            platform: item.attributes.name,
            date: meta.date_value,
            year: new Date(meta.date_value).getFullYear(),
          });
          break;
      }

      return out;
    },
    {studios: [], releases: [], genres: []}
  );

  return {
    id,
    title,
    body,
    path,
    ...relationships,
  };
};

export const getSimpleReleases = releases => {
  const obj = releases.reduce((sr, r) => {
    sr[r.year] = (sr[r.year] || []).concat({...r, year: r.year});
    return sr;
  }, {});
  return Object.values(obj);
};

export const getGame = async path => {
  path = `/games/${path}`;
  const includes = ['studios', 'genres', 'releases'];
  const fields = {
    'node--game': ['title', 'body', 'field_path', 'releases'],
    'node--studio': ['title'],
    'taxonomy_term--platform': ['name'],
  };

  const fieldsToURLString = fields => {
    return Object.keys(fields).reduce(
      (out, field) => `${out}&fields[${field}]=${fields[field].join(',')}`,
      ''
    );
  };
  const queryUrl = `/node/game?filter[field_path]=${path}&include=${includes.join(
    ','
  )}${fieldsToURLString(fields)}`;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_JSONAPI_URL}${queryUrl}`
    );
    const data = await res.json();
    return normalizeGameData(data);
  } catch (e) {
    return null;
  }
};
