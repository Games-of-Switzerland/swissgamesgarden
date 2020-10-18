import {getGames} from 'lib/api';
import Layout from 'components/Layout';
import {GameTeaser} from 'components/Game';
import GamesFilters from 'components/GamesFilters';
import {QueryCache, useInfiniteQuery} from 'react-query';
import {dehydrate} from 'react-query/hydration';
import {useReducer} from 'react';
import {FILTERS} from 'config';
import {useTranslation} from 'react-i18next';

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

  console.log(data);
  return {
    games: data?.reduce((games, {hits}) => [...games, ...hits.hits], []) || [],
    total: data && data[0].hits.total,
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
  const {t} = useTranslation();
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
    total,
  } = useGamesData();

  const renderGames = () =>
    games.length > 0 ? (
      <>
        <div className="grid grid-cols-games justify-center gap-4 mb-16">
          {games.map(game => (
            <GameTeaser game={game._source} key={game._source.id} />
          ))}
        </div>
        {total && (
          <div className="text-center text-gray-500 mb-5">
            {t('games.pager', {start: 1, end: games.length, total})}
          </div>
        )}
        <div className="text-center mb-16">
          <button
            className="btn border text-white text-md py-3 font-semibold border-gray-850 hover:border-gray-500"
            onClick={fetchMore}
            disabled={!canFetchMore || isFetchingMore}
          >
            {isFetchingMore
              ? t('games.loading_more')
              : canFetchMore
              ? t('games.load_more')
              : t('games.load_more_end')}
          </button>
        </div>
      </>
    ) : (
      <p className="text-white">{t('games.no_games')}</p>
    );

  return (
    <Layout>
      {/*<GamesFilters filters={facets} setFilter={setFacet} />*/}

      {isLoading && <span className="text-white">{t('games.loading')}</span>}
      {isError && <span className="text-white">{error.message}</span>}
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
