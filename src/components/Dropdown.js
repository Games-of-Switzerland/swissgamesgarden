import React, {useState} from 'react';
import useComponentVisible from '../utilities/useComponentVisible';
import classNames from 'classnames';
import {usePopper} from 'react-popper';

const Dropdown = props => {
  const {title, children, disabled, className, selectedItems} = props;

  if (disabled) return null;

  const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(
    false
  );

  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const {styles, attributes} = usePopper(referenceElement, popperElement, {
    placement: 'bottom-start',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 5],
        },
      },
    ],
  });

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
        ref={setReferenceElement}
        {...attributes.popper}
      >
        {title}
      </button>

      {isComponentVisible && (
        <div
          className="dropdown-content"
          aria-labelledby={className}
          ref={setPopperElement}
          style={styles.popper}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
