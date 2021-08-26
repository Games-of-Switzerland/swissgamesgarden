import classNames from 'classnames';
import {forwardRef} from 'react';

const CheckboxFilterItem = forwardRef(
  ({isActive, result, onChange, isHighlighted, ...rest}, ref) => (
    <label
      className={classNames(
        'flex items-center p-2 hover:bg-gray-950 cursor-pointer group',
        {
          'text-white': isActive,
          'text-gray-500 hover:text-white': !isActive,
          'bg-gray-950 text-white': isHighlighted,
        }
      )}
      {...rest}
      ref={ref}
    >
      <input
        type="checkbox"
        value={result.key}
        checked={isActive}
        onChange={onChange}
        className={classNames(
          'border-gray-850 bg-transparent focus:ring-0 focus:ring-offset-0 focus:border-gray-500 mr-2',
          {
            'group-hover:border-gray-500': !isActive,
            'border-none text-red-500': isActive,
          }
        )}
      />
      <span className="flex justify-between flex-grow">
        <span>{result.title}</span>{' '}
        <span className="text-gray-700 font-light">{result.doc_count}</span>
      </span>
    </label>
  )
);

export default CheckboxFilterItem;
