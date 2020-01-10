import React from "react";
import useComponentVisible from "../utilities/useComponentVisible";

const Dropdown = props => {
  const {title, children, disabled} = props;

  const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(true);

  const toggleDropdown = () => {
    const newState = !isComponentVisible;
    setIsComponentVisible(newState);
  };

  if (disabled) return null;

  return (
    <div className={`dropdown ${isComponentVisible ? 'open' : ''}`} ref={ref}>
      <button
        className="dropdown-toggle"
        onClick={toggleDropdown}
        aria-haspopup="true"
        aria-expanded={isComponentVisible}
      >
        {title}
      </button>

      {isComponentVisible &&
        <div
          className="dropdown-content"
          aria-labelledby="dropdownMenuButton"
        >
          {children}
        </div>
      }

    </div>
  );
};

export default Dropdown;
