import {getGames} from 'lib/api';
import Layout from 'components/Layout';
import {GameTeaser} from 'components/Game';
import GamesFilters from 'components/GamesFilters';
import {deserialise} from 'kitsu-core';
import {QueryCache, useQuery} from 'react-query';
import {dehydrate} from 'react-query/hydration';
import {useState} from 'react';

const useGamesData = () => {
  const [page, setPage] = useState(0);
  const [gamesData, setGamesData] = useState({games: [], filters: []});
  const {data, isLoading, isFetching, isError, error} = useQuery(
    ['games', {page}],
    getGames,
    {
      onSuccess({hits, aggregations}) {
        setGamesData(old => ({
          games: [...old.games, ...deserialise(hits.hits)],
          filters: deserialise(aggregations.aggs_all),
          canFetchMore: hits.total > hits.hits.length * (page + 1),
        }));
      },
    }
  );

  const fetchMore = () => {
    setPage(old => old + 1);
  };

  return {
    page,
    fetchMore,
    data: gamesData,
    isLoading,
    isFetching,
    isError,
    error,
  };
};

const Games = () => {
  const {
    page,
    data,
    fetchMore,
    isLoading,
    isError,
    isFetching,
  } = useGamesData();

  const {games, filters, canFetchMore} = data;

  if (isLoading) return <span className="text-white">Loading...</span>;
  if (isError)
    return <span className="text-white">Error: {error.message}</span>;

  return games.length > 0 ? (
    <Layout>
      <GamesFilters filters={filters} />
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-4">
        {games.map(game => (
          <GameTeaser game={game._source} key={game.id} />
        ))}
      </div>
      <div>
        <button
          className="btn btn-white"
          onClick={fetchMore}
          disabled={!canFetchMore}
        >
          {isFetching
            ? 'Loading more...'
            : canFetchMore
            ? 'Load More'
            : 'Nothing more to load'}
        </button>
        <div className="text-white">{isFetching ? 'Fetching...' : null}</div>
      </div>
    </Layout>
  ) : (
    <Layout>
      <p>No games to show</p>
    </Layout>
  );
};

export const getServerSideProps = async () => {
  const queryCache = new QueryCache();
  await queryCache.prefetchQuery(['games', {page: 0}], getGames);

  return {
    props: {
      dehydratedState: dehydrate(queryCache),
    },
  };
};

export default Games;
