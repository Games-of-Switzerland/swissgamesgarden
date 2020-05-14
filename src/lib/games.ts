export const getGames = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_JSONAPI_URL}/node/game`);
  return await res.json();
};

export const getGame = async (id: string) => {
  const gameFields = ['title', 'body'];
  const studioFields = ['title'];

  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_JSONAPI_URL
    }/node/game/${id}?fields[node--game]=${gameFields.join(
      ','
    )}&include=studios&fields[node--studio]=${studioFields.join(',')}`
  );
  return await res.json();
};
