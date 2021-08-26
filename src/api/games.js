import {deserialise} from 'kitsu-core';
import {QueryClient, useInfiniteQuery} from 'react-query';
import {dehydrate} from 'react-query/hydration';
import queryString from 'query-string';
import {useGosRouter} from 'hooks';
import {fetchApi} from './api';

const options = {
  refetchOnWindowFocus: false,
  getNextPageParam: lastGroup => lastGroup.nextPage,
  keepPreviousData: true,
  select: data => ({
    ...data,
    total: data.pages?.[0].hits.total,
    facets: data.pages?.[0].aggregations.aggs_all || {},
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
    }
  );

  console.log('GAMES===============', {page: pageParam || 0, ...value});

  // Get games from server
  const data = await fetchApi(queryUrl);

  // Set next page index for next call
  const hasNextPage = data.hits.total > data.hits.hits.length * (pageParam + 1);
  data.page = pageParam;
  data.nextPage = hasNextPage ? pageParam + 1 : false;

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
      // TODO fix once bug is fixed tannerlinsley/react-query/issues/1458
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};
