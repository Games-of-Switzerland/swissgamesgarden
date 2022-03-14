import {prefetchGames, useGames} from 'api/games';
import Error from 'components/Error';
import {GameTeaser} from 'components/Game';
import {FilterContextProvider} from 'components/Games/context';
import GamesFilters from 'components/Games/Filters';
import Loading from 'components/Loading';
import {LoadingSVG} from 'components/Loading/Loading';
import {useTranslation} from 'react-i18next';

const PAGE_SIZE = 24;

const GamesListing = () => {
  const {t} = useTranslation();
  const {
    data = {},
    fetchNextPage,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    error,
    isFetchingNextPage,
    hasNextPage,
  } = useGames();

  const {pages = [], facets = {}, total} = data;

  const renderGames = () =>
    pages.length > 0 ? (
      <>
        <div className="grid grid-cols-games justify-center gap-4 mb-16">
          {pages.map(page =>
            page.hits.hits.map(game => (
              <GameTeaser game={game._source} key={game._source.id} />
            ))
          )}
        </div>
        {total && (
          <div className="text-center text-gray-500 mb-5">
            {t('games.pager', {
              end: Math.min(pages.length * PAGE_SIZE, total),
              total,
            })}
          </div>
        )}
        <div className="text-center mb-16">
          <button
            className="btn btn-border"
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage
              ? t('games.loading_more')
              : hasNextPage
              ? t('games.load_more')
              : t('games.load_more_end')}
          </button>
        </div>
      </>
    ) : (
      <p className="text-white">{t('games.no_games')}</p>
    );

  return (
    <>
      <div className="text-5xl my-20 font-semibold items-center flex flex-col leading-none text-center">
        <span className="text-white tracking-tight">{t('games.title_1')}</span>
        <span className="text-gradient leading-normal">
          {t('games.title_2')}
        </span>
      </div>

      <div className="mb-5 flex space-x-4 items-baseline">
        <span className="font-semibold text-white text-lg">
          {t('games.results', {count: total || 0})}
        </span>
        {isFetching ? (
          <span className="text-gray-700 inline-flex items-baseline">
            <LoadingSVG className="mr-2 h-4 w-4 text-white self-center" />
            {t('games.fetching')}
          </span>
        ) : (
          <>
            {isError && (
              <span className="text-red-500">
                {t('error.with_message', {message: error.message})}
              </span>
            )}
            {isSuccess && (
              <span className="text-gray-850">
                {t('games.fetched_in_ms', {
                  ms: `${data.pages[data.pages.length - 1].took}ms`,
                })}
              </span>
            )}
          </>
        )}
      </div>

      <GamesFilters filters={facets} />

      {isLoading && <Loading />}
      {isError && <Error message={error?.message} />}
      {isSuccess && renderGames()}
    </>
  );
};

const Games = () => (
  <FilterContextProvider>
    <GamesListing />
  </FilterContextProvider>
);

export const getServerSideProps = prefetchGames;

export default Games;
