import React from "react";
import useComponentVisible from "../utilities/useComponentVisible";

const Dropdown = props => {
  const {title, children, disabled, className} = props;

  const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(false);

  if (disabled) return null;

  return (
    <div className={`dropdown ${isComponentVisible ? 'open' : ''}`} ref={ref}>
      <button
        className="dropdown-toggle"
        onClick={() => setIsComponentVisible(prevState => !prevState)}
        aria-haspopup="true"
        aria-expanded={isComponentVisible}
        id={className}
      >
        {title}
      </button>

      {isComponentVisible &&
        <div
          className="dropdown-content"
          aria-labelledby={className}
        >
          {children}
        </div>
      }

    </div>
  );
};

export default Dropdown;
