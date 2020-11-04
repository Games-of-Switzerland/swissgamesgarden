import {useTranslation} from 'react-i18next';
import {useState} from 'react';
import Dropdown, {CheckboxFilterItem} from './index';
import {useCombobox} from 'downshift';

const stateReducer = (state, {type, changes}) => {
  switch (type) {
    case useCombobox.stateChangeTypes.ItemClick:
    case useCombobox.stateChangeTypes.InputKeyDownEnter:
      return {
        ...changes,
        inputValue: state.inputValue,
      };
    default:
      return changes;
  }
};

const FilterableContent = ({items, selectedItems, onClick}) => {
  const {t} = useTranslation();
  const [inputItems, setInputItems] = useState(items);

  const {
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    selectItem,
  } = useCombobox({
    stateReducer,
    items: inputItems,
    onInputValueChange: ({inputValue}) => {
      setInputItems(
        items.filter(({title}) =>
          title
            .toLowerCase()
            .replace(/\s/, '')
            .includes(inputValue.toLowerCase().replace(/\s/, ''))
        )
      );
    },
    onSelectedItemChange: ({selectedItem}) => {
      selectedItem && onClick(selectedItem.key);
      // Deselect the item afterwards, to make sure you can
      selectItem(null);
    },
  });

  return (
    <>
      <div {...getComboboxProps()}>
        <input
          {...getInputProps({
            className:
              'autosuggest-input w-full appearance-none bg-gray-900 block flex-grow max-w-full border border-transparent text-white text-lg font-thin py-2 pr-8 pl-14 placeholder-gray-500 focus:outline-none focus:bg-gray-900 focus:border-gray-850 mb-3',
            type: 'search',
            placeholder: t('games.filter_placeholder'),
            autoFocus: true,
          })}
        />
      </div>
      <div
        {...getMenuProps({
          className: 'max-h-24 overflow-y-auto big-scrollbar mb-3',
        })}
      >
        {inputItems.map((item, index) => {
          return (
            <CheckboxFilterItem
              key={item.key}
              {...getItemProps({
                isHighlighted: highlightedIndex === index,
                item,
                index,
                result: item,
                isActive: selectedItems.includes(item.key),
              })}
            />
          );
        })}
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
