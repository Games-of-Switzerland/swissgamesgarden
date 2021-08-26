import {useTranslation} from 'react-i18next';
import {useState} from 'react';
import Dropdown, {CheckboxFilterItem} from './index';

const FilterableContent = ({items, selectedItems, onClick}) => {
  const {t} = useTranslation();
  const [inputItems, setInputItems] = useState(items);

  const inputProps = {
    className:
      'transition transition-spacing transition-background autosuggest-input w-full appearance-none bg-gray-900 block flex-grow max-w-full border border-transparent text-white text-lg font-thin placeholder-gray-500 py-2 pr-8 pl-12 focus:pl-9 focus:ring-0 ring-0 focus:bg-gray-900 focus:border-gray-800 mb-3',
    type: 'search',
    placeholder: t('games.filter_placeholder'),
    onChange: e => {
      const value = e.target.value;
      setInputItems(
        items.filter(({title}) =>
          title
            .toLowerCase()
            .replace(/\s/, '')
            .includes(value.toLowerCase().replace(/\s/, ''))
        )
      );
    },
  };

  return (
    <>
      <div>
        <input {...inputProps} />
      </div>
      <div className="max-h-60 overflow-y-auto big-scrollbar mb-3">
        {inputItems.map((item, index) => (
          <CheckboxFilterItem
            key={item.key}
            isHighlighted={false}
            result={item}
            isActive={selectedItems.includes(item.key)}
            onChange={e => onClick(item.key)}
          />
        ))}
        {inputItems.length === 0 && <div>{t('games.filter_no_results')}</div>}
      </div>
    </>
  );
};

const FilterableDropdown = ({title, selectedItems, onReset, ...rest}) => {
  const {t} = useTranslation();

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
      className="mb-1 mr-1"
    >
      <FilterableContent {...rest} selectedItems={selectedItems} />
    </Dropdown>
  );
};

export default FilterableDropdown;
