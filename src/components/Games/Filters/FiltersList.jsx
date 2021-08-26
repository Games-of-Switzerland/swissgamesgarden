import {useGosRouter} from 'hooks';
import {useCallback} from 'react';
import queryString from 'query-string';
import {useTranslation} from 'react-i18next';

const FilterItem = ({value, onClick}) => {
  return (
    <button
      className="mb-1 appearance-none border border-gray-850 text-gray-500 px-1 inline-flex items-center space-x-1 hover:border-gray-800 hover:text-white focus:outline-none focus:ring"
      onClick={onClick}
    >
      <span className="text-md">
        {typeof value === 'string' ? value : value.join(', ')}{' '}
      </span>
      <span className="text-lg">&times;</span>
    </button>
  );
};

const FiltersList = () => {
  const {t} = useTranslation();
  const {query, replace} = useGosRouter();

  const resetAll = async () => {
    await replace({
      pathname: '/',
    });
  };

  const handleRemoveFilter = useCallback(
    async ([filterName, value]) => {
      const newQuery = query;
      const filter = newQuery[filterName];

      if (typeof filter === 'string') {
        delete newQuery[filterName];
      } else {
        newQuery[filterName] = newQuery[filterName].filter(p => p !== value);
      }

      await replace(
        {
          pathname: '/',
          newQuery,
        },
        `?${queryString.stringify(newQuery, {arrayFormat: 'bracket'})}`
      );
    },
    [query]
  );

  const filterEntries = Object.entries(query);

  if (filterEntries.length === 0) return null;

  return (
    <div className="flex space-x-1 overflow-x-auto px-4 -mx-4">
      {filterEntries.reduce((acc, filter) => {
        const [filterName, value] = filter;

        const component =
          typeof value === 'string'
            ? [
                <FilterItem
                  key={filter.join('-')}
                  value={t(`${filterName}.${value}`)}
                  onClick={() => handleRemoveFilter(filter)}
                />,
              ]
            : value.map(val => (
                <FilterItem
                  key={`${filter[0]}-${val}`}
                  value={t(`${filterName}.${val}`)}
                  onClick={() => handleRemoveFilter([filterName, val])}
                />
              ));

        return [...acc, ...component];
      }, [])}
      <button
        className="appearance-none whitespace-nowrap text-gray-500 mb-1 hover:text-white px-2"
        onClick={resetAll}
      >
        {t('reset_filters')}
      </button>
    </div>
  );
};

export default FiltersList;
