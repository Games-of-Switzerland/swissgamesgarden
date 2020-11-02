import addOrRemove from 'utils/addOrRemove';
import {FilterableDropdown} from 'components/Dropdown';
import {useTranslation} from 'react-i18next';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import {useGosRouter} from 'hooks';

const BaseFilter = ({data, filterName}) => {
  const {t} = useTranslation();
  const {query, replace} = useGosRouter();

  let filter = query[filterName] || [];

  if (typeof filter === 'string') {
    filter = [filter];
  }

  const handleClick = async key => {
    const newFilter = addOrRemove(filter, key);
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
  };

  const handleReset = async () => {
    await replace({
      pathname: '/',
    });
  };

  data = data.map(item => ({
    ...item,
    title: t(`${filterName}.${item.key_as_string || item.key}`),
  }));

  return (
    <FilterableDropdown
      items={data}
      selectedItems={filter}
      title={t(`${filterName}.title`)}
      onClick={handleClick}
      onReset={handleReset}
    />
  );
};

BaseFilter.propTypes = {
  filterName: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.any.isRequired,
      doc_count: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default BaseFilter;
