import {useTranslation} from 'react-i18next';
import {useEffect, useState} from 'react';
import Dropdown, {CheckboxFilterItem} from './index';

const FilterableDropdown = ({
  items,
  title,
  selectedItems,
  onClick,
  onReset,
}) => {
  const {t} = useTranslation();
  const [filteredItems, setFilteredItems] = useState(items);

  const handleChange = e => {
    const newValue = e.target.value;
    const newFilteredItems = items.filter(({title}) =>
      title
        .toLowerCase()
        .replace(/\s/, '')
        .includes(newValue.toLowerCase().replace(/\s/, ''))
    );

    setFilteredItems(newFilteredItems);
  };

  useEffect(() => {
    setFilteredItems(items);
  }, [items]);

  const resetBtn = close => (
    <button
      disabled={selectedItems.length === 0}
      className="btn btn-gray py-4 w-full"
      onClick={() => {
        onReset();
        close();
      }}
    >
      {t('reset')}
    </button>
  );

  return (
    <Dropdown
      title={title}
      isSelected={selectedItems.length > 0}
      content={resetBtn}
    >
      <input
        className="autosuggest-input w-full appearance-none bg-gray-900 block flex-grow max-w-full border border-transparent text-white text-lg font-thin py-2 pr-8 pl-14 placeholder-gray-500 focus:outline-none focus:bg-gray-900 focus:border-gray-850 mb-3"
        type="search"
        placeholder={t('games.filter_placeholder')}
        onChange={handleChange}
        autoFocus={true}
      />
      <div className="max-h-24 overflow-y-auto big-scrollbar">
        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
            <CheckboxFilterItem
              key={item.title}
              item={item}
              isSelected={selectedItems.length > 0}
              isActive={selectedItems.includes(item.key)}
              onClick={() => onClick(item.key)}
            />
          ))
        ) : (
          <div>{t('games.filter_no_results')}</div>
        )}
      </div>
    </Dropdown>
  );
};

export default FilterableDropdown;
