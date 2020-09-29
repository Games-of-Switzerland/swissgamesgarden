import {getGames} from 'lib/api';
import Layout from 'components/Layout';
import {GameTeaser} from 'components/Game';
import GamesFilters from 'components/GamesFilters';
import {QueryCache, useInfiniteQuery} from 'react-query';
import {dehydrate} from 'react-query/hydration';

const useGamesData = (params = {}) => {
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

  return {
    games: data?.reduce((games, {hits}) => [...games, ...hits.hits], []) || [],
    filters: (data && data[0].aggregations.aggs_all) || {},
    fetchMore: () => fetchMore(), // Must not send any params (like click event)
    isLoading,
    isFetching,
    isError,
    isSuccess,
    error,
    isFetchingMore,
    canFetchMore,
  };
};

const Games = () => {
  const {
    games,
    filters,
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
            <GameTeaser game={game._source} key={game.id} />
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
      <GamesFilters filters={filters} />

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
