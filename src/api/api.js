const fetchApi = async queryUrl => {
  const res = await fetch(
    `${typeof window === 'undefined'
    ? process.env.NEXT_PUBLIC_SERVER_ELASTICSEARCH
    : process.env.NEXT_PUBLIC_ELASTICSEARCH}/games?${queryUrl}`
  );
  return await res.json();
};

export {fetchApi};
