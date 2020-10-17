import {getGames} from 'lib/api';
import Layout from 'components/Layout';
import {GameTeaser} from 'components/Game';
import GamesFilters from 'components/GamesFilters';
import {QueryCache, useInfiniteQuery} from 'react-query';
import {dehydrate} from 'react-query/hydration';
import {useReducer} from 'react';
import {FILTERS} from 'config';

const filtersReducer = (state, action) => {
  switch (action.type) {
    case FILTERS.PLATFORMS:
      return {...state, platforms: action.payload};
    default:
      return state;
  }
};

const useGamesData = () => {
  const [params, dispatch] = useReducer(filtersReducer, {});

  // Query all the games with infinite query with all passed params
  const {
    isLoading,
    isFetching,
    isFetchingMore,
    isError,
    isSuccess,
    error,
    data,
    fetchMore,
    canFetchMore,
  } = useInfiniteQuery(['games', params], getGames, {
    refetchOnWindowFocus: false,
    getFetchMore: lastGroup => lastGroup.nextPage,
  });

  const setFacet = (filterName, payload) =>
    dispatch({type: filterName, payload});

  return {
    games: data?.reduce((games, {hits}) => [...games, ...hits.hits], []) || [],
    facets: (data && data[0].aggregations.aggs_all) || {},
    fetchMore: () => fetchMore(), // Must not send any params (like click event)
    isLoading,
    isFetching,
    isError,
    isSuccess,
    error,
    isFetchingMore,
    canFetchMore,
    params,
    setFacet,
  };
};

const Games = () => {
  const {
    games,
    facets,
    fetchMore,
    isLoading,
    isError,
    isSuccess,
    error,
    isFetchingMore,
    canFetchMore,
  } = useGamesData();

  const renderGames = () =>
    games.length > 0 ? (
      <>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-4">
          {games.map(game => (
            <GameTeaser game={game._source} key={game._source.id} />
          ))}
        </div>
        <div>
          <button
            className="btn btn-white"
            onClick={fetchMore}
            disabled={!canFetchMore || isFetchingMore}
          >
            {isFetchingMore
              ? 'Loading more...'
              : canFetchMore
              ? 'Load More'
              : 'Nothing more to load'}
          </button>
        </div>
      </>
    ) : (
      <p className="text-white">No games to show.</p>
    );

  return (
    <Layout>
      {/*<GamesFilters filters={facets} setFilter={setFacet} />*/}

      {isLoading && <span className="text-white">Loading...</span>}
      {isError && <span className="text-white">Error: {error.message}</span>}
      {isSuccess && renderGames()}
    </Layout>
  );
};

export const getServerSideProps = async () => {
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

export default Games;
