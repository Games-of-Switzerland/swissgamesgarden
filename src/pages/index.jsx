import {GameTeaser} from 'components/Game';
import {useTranslation} from 'react-i18next';
import {prefetchGames, useGames} from 'api/games';
import Layout from '../components/Layout';
import {Fragment} from 'react';

const PAGE_SIZE = 24;

const Games = props => {
  console.log(props);
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
    ...rest
  } = useGames();

  console.log('pages.length', pages.length);

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
    <Layout>
      {/*<GamesFilters filters={facets} setFilter={setFacet} />*/}

      {isLoading && <span className="text-white">{t('games.loading')}</span>}
      {isError && <span className="text-white">{error.message}</span>}
      {isSuccess && renderGames()}
    </Layout>
  );
};

// export const getServerSideProps = prefetchGames;

export default Games;
