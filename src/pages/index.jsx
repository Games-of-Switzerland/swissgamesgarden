import {GameTeaser} from 'components/Game';
import {useTranslation} from 'react-i18next';
import {useGames} from 'api/games';
import Loading from 'components/Loading';
import Error from 'components/Error';

const PAGE_SIZE = 24;

const Games = () => {
  const {t} = useTranslation();
  const {
    pages,
    fetchMore,
    isLoading,
    isError,
    isSuccess,
    error,
    isFetchingMore,
    canFetchMore,
    total,
    facets,
    setFacet,
  } = useGames();

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
            {t('games.pager', {start: 1, end: pages.length * PAGE_SIZE, total})}
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
    <>
      <div className="text-5xl my-20 font-semibold items-center flex flex-col leading-none text-center">
        <span className="text-white tracking-tight">{t('games.title_1')}</span>
        <span className="text-gradient">{t('games.title_2')}</span>
      </div>

      <div className="mb-5">
        <span className="font-semibold text-white text-lg">
          {t('games.results', {count: total})}
        </span>
      </div>

      {/*<GamesFilters filters={facets} setFilter={setFacet} />*/}

      {isLoading && <Loading />}
      {isError && <Error message={error?.message} />}
      {isSuccess && renderGames()}
    </>
  );
};

// export const getServerSideProps = prefetchGames;

export default Games;
