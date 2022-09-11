import {useGosRouter} from 'hooks';
import {deserialise} from 'kitsu-core';
import queryString from 'query-string';
import {QueryClient, useInfiniteQuery} from 'react-query';
import {dehydrate} from 'react-query/hydration';
import {fetchApi} from './api';

const options = {
  refetchOnWindowFocus: false,
  getNextPageParam: lastGroup => lastGroup.nextPage ?? false,
  keepPreviousData: true,
  select: data => ({
    ...data,
    total: data?.pages?.[0].hits?.total || 0,
    facets: data?.pages?.[0].aggregations?.aggs_all || {},
  }),
};

export const fetchGames = async ({queryKey: [, value], pageParam}) => {
  const queryUrl = queryString.stringify(
    {
      page: pageParam || 0,
      ...value,
    },
    {
      arrayFormat: 'bracket',
    },
  );

  // Get games from server
  const data = await fetchApi(queryUrl);

  if (typeof data.errors != "undefined") {
    return data;
  }

  // Set next page index for next call
  const hasNextPage = data.hits.total > (data.hits.hits.length * ((pageParam || 0) + 1));

  data.page = pageParam;
  data.nextPage = hasNextPage ? (pageParam || 0) + 1 : false;

  return deserialise(data);
};

export const useGames = () => {
  const {query} = useGosRouter();

  // Query all the games with infinite query with all passed params
  return useInfiniteQuery(['games', query], fetchGames, options);
};

export const prefetchGames = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery(['games', {}], fetchGames, options);

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};
