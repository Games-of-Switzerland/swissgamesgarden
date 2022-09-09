import {prefetchGames, useGames} from 'api/games';
import Error from 'components/Error';
import {GameTeaser} from 'components/Game';
import {FilterContextProvider} from 'components/Games/context';
import GamesFilters from 'components/Games/Filters';
import Loading from 'components/Loading';
import {LoadingSVG} from 'components/Loading/Loading';
import {useTranslation} from 'react-i18next';
import GhostIcon from 'svg/ghost.svg';

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
    total > 0 ? (
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
      <div className="flex justify-center items-center gap-6 my-20 text-white">
        <GhostIcon className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0" />
        <div>
          <h1 className="text-3xl">{t('games.no_games_title')}</h1>
          <h1 className="text-lg text-gray-600">{t('games.no_games')}</h1>
        </div>
      </div>
    );

  return (
    <>
      <div className="relative mb-6">
        {/*<Pattern className="absolute inset-0 z-0 object-cover" />*/}
        <div className="absolute inset-y-0 -inset-x-4 shadows-tb">
          <img
            src="/pattern.svg"
            alt=""
            className="h-full object-cover"
            // style={{width: 'calc(100% + 0.9375rem * 2)'}}
          />
        </div>
        <div className="text-3xl md:text-5xl my-10 md:my-20 font-semibold items-center flex flex-col leading-none text-center relative z-10">
          <span className="text-white tracking-tight">
            {t('games.title_1')}
          </span>
          <span className="text-gradient leading-normal">
            {t('games.title_2')}
          </span>
        </div>
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
            {isSuccess && data.pages[data.pages.length - 1].took && (
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
