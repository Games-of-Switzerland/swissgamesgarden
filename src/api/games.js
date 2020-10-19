import {deserialise, query} from 'kitsu-core';
import {QueryCache, useInfiniteQuery} from 'react-query';
import {useReducer} from 'react';
import {FILTERS} from 'config';
import {dehydrate} from 'react-query/hydration';

export const getGames = async (key, params = {}, page = 0) => {
  const queryUrl = query({...params, page});
  console.log(`%csearch query: ${queryUrl}`, 'font-weight:bold;');

  // Get games from server
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ELASTICSEARCH}/games?${queryUrl}`
  );
  const data = await res.json();

  // Set next page index for next call
  const hasNextPage = data.hits.total > data.hits.hits.length * (page + 1);
  data.page = page;
  data.nextPage = hasNextPage ? page + 1 : false;

  return deserialise(data);
};

const filtersReducer = (state, action) => {
  switch (action.type) {
    case FILTERS.PLATFORMS:
      return {...state, platforms: action.payload};
    default:
      return state;
  }
};

export const useGames = () => {
  const [params, dispatch] = useReducer(filtersReducer, {});

  // Query all the games with infinite query with all passed params
  const gamesQuery = useInfiniteQuery(['games', params], getGames, {
    refetchOnWindowFocus: false,
    getFetchMore: lastGroup => lastGroup.nextPage,
  });

  const setFacet = (filterName, payload) =>
    dispatch({type: filterName, payload});

  const {data, fetchMore} = gamesQuery;

  return {
    games: data?.reduce((games, {hits}) => [...games, ...hits.hits], []) || [],
    total: data && data[0].hits.total,
    facets: (data && data[0].aggregations.aggs_all) || {},
    ...gamesQuery,
    fetchMore: () => fetchMore(), // Must not send any params (like click event)
    params,
    setFacet,
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
