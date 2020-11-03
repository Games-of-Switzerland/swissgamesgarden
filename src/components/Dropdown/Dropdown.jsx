import React, {useState} from 'react';
import useComponentVisible from 'utils/useComponentVisible';
import classNames from 'classnames';
import {usePopper} from 'react-popper';

const Dropdown = ({title, content, children, disabled, isSelected}) => {
  const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(
    false
  );

  const toggle = () => {
    const newState = !isComponentVisible;
    setIsComponentVisible(newState);
  };

  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
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

  if (disabled) return null;

  const wrapperClasses = classNames('relative z-20', {
    'border-gradient border-gradient-full': !isComponentVisible && isSelected,
  });

  const btnClasses = classNames(
    'z-10 inline-flex items-center dropdown-toggle border py-2 px-4 text-white text-md focus:outline-none',
    {
      'open bg-gray-1000 border-gray-850 text-white': isComponentVisible,
      'bg-gray-900 hover:bg-gray-850 border-gray-900 hover:border-gray-850': !isComponentVisible,
    }
  );

  return (
    <div className={wrapperClasses} ref={ref}>
      <button
        className={btnClasses}
        onClick={toggle}
        aria-haspopup="true"
        aria-expanded={isComponentVisible}
        ref={setReferenceElement}
        {...attributes.popper}
      >
        {title}
      </button>

      {isComponentVisible && (
        <div
          className="absolute z-0 bg-gray-1000 p-4 border border-gray-850 min-w-20"
          ref={setPopperElement}
          style={styles.popper}
        >
          {children}
          {content && content(toggle)}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
