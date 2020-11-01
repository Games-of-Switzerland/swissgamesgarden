import {deserialise, query} from 'kitsu-core';
import {QueryCache, useInfiniteQuery} from 'react-query';
import {dehydrate} from 'react-query/hydration';
import {useRouter} from 'next/router';

export const getGames = async (key, params = {}, nextPage = 0) => {
  const queryUrl = query({...params, page: nextPage});

  // Get games from server
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ELASTICSEARCH}/games?${queryUrl}`
  );
  const data = await res.json();

  // Set next page index for next call
  const hasNextPage = data.hits.total > data.hits.hits.length * (nextPage + 1);
  data.page = nextPage;
  data.nextPage = hasNextPage ? nextPage + 1 : null;

  return deserialise(data);
};

export const useGames = () => {
  const {query} = useRouter();

  // Query all the games with infinite query with all passed params
  const gamesQuery = useInfiniteQuery(['games', query], getGames, {
    refetchOnWindowFocus: false,
    getFetchMore: lastGroup => lastGroup.nextPage,
    keepPreviousData: true,
  });

  const {data, fetchMore} = gamesQuery;

  return {
    ...gamesQuery,
    pages: data || [],
    total: data && data[0].hits.total,
    facets: (data && data[0].aggregations.aggs_all) || {},
    fetchMore: () => fetchMore(), // Must not send any params (like click event)
  };
};

export const prefetchGames = async () => {
  const queryCache = new QueryCache();
  await queryCache.prefetchQuery(['games', {}], getGames, {
    infinite: true,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryCache),
    },
  };
};
