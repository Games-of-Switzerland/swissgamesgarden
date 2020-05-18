import React from 'react';

const Reset = ({translate, resetFilters, hasFilters}) => {
  if (!hasFilters) return null;
  return (
    <button className="btn btn-link" onClick={resetFilters}>
      {translate('reset.clear_all')}
    </button>
  );
};

export default Reset;
