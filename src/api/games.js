import {deserialise} from 'kitsu-core';
import {QueryClient, useInfiniteQuery} from 'react-query';
import {dehydrate} from 'react-query/hydration';
import queryString from 'query-string';
import {useGosRouter} from 'hooks';
import {useMemo} from 'react';

export const fetchGames = async pageIndex => {
  const queryUrl = queryString.stringify(
    {page: pageIndex},
    {
      arrayFormat: 'bracket',
    }
  );

  console.log('GAMES===============', decodeURI(queryUrl));

  // Get games from server
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ELASTICSEARCH}/games?${queryUrl}`
  );
  const data = await res.json();

  // Set next page index for next call
  const hasNextPage = data.hits.total > data.hits.hits.length * (pageIndex + 1);
  data.page = pageIndex;
  data.nextPage = hasNextPage ? pageIndex + 1 : false;

  return deserialise(data);
};

export const useGames = () => {
  const {query} = useGosRouter();

  // Query all the games with infinite query with all passed params
  const gamesQuery = useInfiniteQuery(
    ['games', query],
    ({pageParam = 0}) => fetchGames(pageParam),
    {
      refetchOnWindowFocus: false,
      getNextPageParam: lastGroup => lastGroup.nextPage,
      keepPreviousData: true,
    }
  );

  const {data} = gamesQuery;

  return {
    ...gamesQuery,
    total: data.pages?.[0].hits.total,
    facets: useMemo(() => data.pages?.[0].aggregations.aggs_all || {}, [data]),
  };
};

export const prefetchGames = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery(
    ['games', {}],
    ({pageParam = 0}) => fetchGames(pageParam),
    {
      getNextPageParam: lastGroup => lastGroup.nextPage,
    }
  );

  return {
    props: {
      // TODO fix once bug is fixed tannerlinsley/react-query/issues/1458
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};
