import React, {useState} from 'react';
import {useRouter} from 'next/router';
import {useCombobox} from 'downshift';
import {useAutocomplete} from 'api/autocomplete';
import classNames from 'classnames';
import {useTranslation} from 'react-i18next';

const AutoSuggest = () => {
  const {t} = useTranslation();
  const [inputValue, setInputValue] = useState('');
  const items = useAutocomplete(inputValue);
  const router = useRouter();

  const {
    isOpen,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    id: 'search-field',
    items,
    onInputValueChange: ({inputValue}) => {
      setInputValue(inputValue);
    },
    itemToString: item => item?.value,
    onSelectedItemChange: ({selectedItem}) => {
      router.push(selectedItem.path);
    },
  });

  return (
    <>
      <label {...getLabelProps({className: 'sr-only'})}>
        {t('autocomplete.label')}
      </label>
      <div {...getComboboxProps({className: 'relative flex bg-gray-900'})}>
        <input
          {...getInputProps({
            className:
              'autosuggest-input appearance-none bg-transparent block flex-grow max-w-full border border-transparent text-white text-lg font-thin py-2 pr-8 pl-14 placeholder-gray-500 focus:outline-none focus:bg-gray-900 focus:border-gray-850',
            placeholder: t('autocomplete.placeholder'),
            type: 'search',
          })}
        />
        <ul
          {...getMenuProps({
            className: classNames('absolute w-full top-full z-40', {
              hidden: !isOpen,
              'flex flex-col border border-gray-850 border-t-0 text-white font-thin bg-gray-1000': isOpen,
            }),
          })}
        >
          {isOpen &&
            items.map((item, index) => {
              const {text, icon, kind, path} = item;
              return (
                <li
                  {...getItemProps({
                    key: index,
                    item,
                    className: classNames(
                      'flex items-baseline pr-5 py-2 leading-7 text-gray-500 cursor-pointer hover:bg-gray-950',
                      {'bg-gray-950': highlightedIndex === index}
                    ),
                  })}
                >
                  <span className="w-14 text-center">{icon}</span>
                  <span>{text}</span>
                  <span className="ml-auto text-gray-500 text-md">{kind}</span>
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
};

export default AutoSuggest;
