import React from 'react';
import useComponentVisible from '../utilities/useComponentVisible';
import classNames from 'classnames';

const Dropdown = props => {
  const {title, children, disabled, className, selectedItems} = props;

  const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(
    false
  );

  if (disabled) return null;

  const classes = classNames(
    'dropdown',
    isComponentVisible && 'open',
    selectedItems && selectedItems.length > 0 && 'border-nice'
  );

  return (
    <div className={classes} ref={ref}>
      <button
        className="dropdown-toggle"
        onClick={() => setIsComponentVisible(prevState => !prevState)}
        aria-haspopup="true"
        aria-expanded={isComponentVisible}
        id={className}
      >
        {title}
      </button>

      {isComponentVisible && (
        <div className="dropdown-content" aria-labelledby={className}>
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
