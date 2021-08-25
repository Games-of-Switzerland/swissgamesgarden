const fetchApi = async queryUrl => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ELASTICSEARCH}/games?${queryUrl}`
  );
  return await res.json();
};

export {fetchApi};
