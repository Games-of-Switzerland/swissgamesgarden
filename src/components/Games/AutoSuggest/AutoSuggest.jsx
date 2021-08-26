import React, {useState} from 'react';
import {useRouter} from 'next/router';
import {useCombobox} from 'downshift';
import {getAutocomplete} from 'api/autocomplete';
import classNames from 'classnames';
import {useTranslation} from 'react-i18next';
import {useQuery} from 'react-query';

const AutoSuggest = props => {
  const {t} = useTranslation();
  const [inputValue, setInputValue] = useState('');

  const {data = []} = useQuery(['autocomplete', inputValue], getAutocomplete, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: !!inputValue,
    keepPreviousData: true,
  });
  const router = useRouter();

  const {
    isOpen,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    selectedItem,
  } = useCombobox({
    id: 'search-field',
    items: data,
    onInputValueChange: ({inputValue}) => {
      setInputValue(inputValue);
    },
    itemToString: item => item?.value || '',
    onSelectedItemChange: ({selectedItem}) => {
      router.push(selectedItem.path);
    },
  });

  return (
    <div {...props}>
      <label {...getLabelProps({className: 'sr-only'})}>
        {t('autocomplete.label')}
      </label>
      <div {...getComboboxProps({className: 'relative flex bg-gray-900'})}>
        <input
          {...getInputProps({
            className:
              'autosuggest-input appearance-none bg-transparent block flex-grow max-w-full border border-transparent text-white text-lg font-thin py-2 pr-4 pl-10 focus:ring-0 ring-0 placeholder-gray-500 focus:outline-none focus:bg-gray-900 focus:border-gray-800',
            placeholder: t('autocomplete.placeholder'),
            type: 'search',
          })}
        />
        <ul
          {...getMenuProps({
            className: classNames('absolute w-full top-full z-50', {
              hidden: !isOpen,
              'flex flex-col border border-gray-850 border-t-0 text-white bg-gray-1000': isOpen,
            }),
          })}
        >
          {isOpen &&
            data.map((item, index) => {
              const {text, icon, kind} = item;
              return (
                <li key={`${item}${index}`}>
                  <a
                    {...getItemProps({
                      index,
                      item,
                      className: classNames(
                        'flex items-baseline pr-5 py-2 leading-7 text-gray-500 cursor-pointer hover:bg-gray-950',
                        {'bg-gray-950': highlightedIndex === index}
                      ),
                    })}
                  >
                    <span className="w-14 flex justify-center text-center self-center">
                      {icon}
                    </span>
                    <span>{text}</span>
                    <span className="ml-auto text-gray-500 text-md">
                      {kind}
                    </span>
                  </a>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default AutoSuggest;
