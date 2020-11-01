import classNames from 'classnames';

const CheckboxFilterItem = ({isActive, result, onClick, isHighlighted}) => {
  return (
    <label
      className={classNames(
        'flex items-center p-2 hover:bg-gray-950 cursor-pointer group',
        {
          'text-white': isActive,
          'text-gray-500 hover:text-white': !isActive,
          'bg-gray-950 text-white': isHighlighted,
        }
      )}
    >
      <input
        type="checkbox"
        value={result.key}
        checked={isActive}
        onChange={onClick}
        className={classNames(
          'form-checkbox focus:shadow-none focus:border-gray-850 mr-2',
          {
            'group-hover:border-gray-500': !isActive,
            'border-none': isActive,
          }
        )}
      />
      <span className="flex justify-between flex-grow">
        <span>{result.title}</span>{' '}
        <span className="text-gray-700 font-light">{result.doc_count}</span>
      </span>
    </label>
  );
};

export default CheckboxFilterItem;
