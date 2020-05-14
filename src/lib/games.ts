export const getGames = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_JSONAPI_URL}/node/game`);
  return await res.json();
};

export const getGame = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_JSONAPI_URL}/node/game/${id}`
  );
  return await res.json();
};
