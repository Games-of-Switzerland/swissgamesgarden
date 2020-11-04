import {FilterableDropdown} from 'components/Dropdown';
import {useTranslation} from 'react-i18next';
import PropTypes from 'prop-types';
import {useGosFilter} from 'hooks';

const BaseFilter = ({data, filterName}) => {
  const {t} = useTranslation();
  const {save, reset, filter} = useGosFilter({filterName, isArray: true});

  data = data.map(item => ({
    ...item,
    title: t(`${filterName}.${item.key_as_string || item.key}`),
  }));

  return (
    <FilterableDropdown
      items={data}
      selectedItems={filter}
      title={t(`${filterName}.title`)}
      onClick={save}
      onReset={reset}
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
