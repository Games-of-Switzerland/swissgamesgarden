import React from 'react';

const SelectedTag = props => {
  const {filterId, removeFilter, labelValue} = props;
  return (
    <span className={`tag tag-${filterId}`}>
      <span>{labelValue}</span>
      <button className="tag-close" onClick={removeFilter}>
        &times;
      </button>
    </span>
  );
};

export default SelectedTag;
