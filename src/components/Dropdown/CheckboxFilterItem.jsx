import classNames from 'classnames';

const CheckboxFilterItem = ({isActive, item, onClick}) => (
  <label
    className={classNames(
      'flex items-center p-2 hover:bg-gray-950 cursor-pointer group',
      {
        'text-white': isActive,
        'text-gray-500 hover:text-white': !isActive,
      }
    )}
  >
    <input
      type="checkbox"
      value={item.key}
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
      <span>{item.title}</span>{' '}
      <span className="text-gray-700 font-light">{item.doc_count}</span>
    </span>
  </label>
);

export default CheckboxFilterItem;
