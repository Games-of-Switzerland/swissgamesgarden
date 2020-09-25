import React from 'react';
import PropTypes from 'prop-types';
import slugify from 'utils/slugify';

const CheckboxListItem = ({highlighted, onMouseOver, onChange, item}) => (
  <div
    className={`dropdown-option ${highlighted ? 'highlighted' : ''}`}
    onMouseOver={onMouseOver}
  >
    <input
      type="checkbox"
      value={item.key}
      onChange={onChange}
      checked={!!item.selected}
      id={slugify(item.key)}
    />
    <label className="dropdown-option-label" htmlFor={slugify(item.key)}>
      {item.key} ({item.doc_count})
    </label>
  </div>
);

CheckboxListItem.propTypes = {
  highlighted: PropTypes.bool.isRequired,
  onMouseOver: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  item: PropTypes.shape({
    key: PropTypes.string.isRequired,
    selected: PropTypes.bool,
    doc_count: PropTypes.number.isRequired,
  }),
};

export default CheckboxListItem;
