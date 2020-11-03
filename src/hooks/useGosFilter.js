import queryString from 'query-string';
import {useCallback} from 'react';
import addOrRemove from 'utils/addOrRemove';
import {useGosRouter} from './index';

const useGosFilter = ({filterName, isArray = false, isNumber = false}) => {
  const {query, replace} = useGosRouter();

  let filter = query[filterName] || (isArray ? [] : isNumber ? 0 : '');

  if (isArray && typeof filter === 'string') {
    filter = [filter];
  }

  const handleReset = useCallback(async () => {
    const newQuery = query;
    delete newQuery[filterName];
    await replace(
      {
        pathname: '/',
        newQuery,
      },
      `?${queryString.stringify(newQuery, {arrayFormat: 'bracket'})}`
    );
  }, [query]);

  const handleSave = useCallback(
    async key => {
      const newFilter = isArray ? addOrRemove(filter, key) : key;
      const newQuery = {
        ...query,
        [filterName]: newFilter,
      };

      await replace(
        {
          pathname: '/',
          query: newQuery,
        },
        `?${queryString.stringify(newQuery, {arrayFormat: 'bracket'})}`
      );
    },
    [filter, query]
  );

  return {
    save: handleSave,
    reset: handleReset,
    filter,
  };
};

export default useGosFilter;
