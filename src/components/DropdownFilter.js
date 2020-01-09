import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import shortid from 'shortid';
import useComponentVisible from "../utilities/useComponentVisible";
import useFocus from "../utilities/useFocus";
import {useKeyPress} from "../utilities";

const DropdownFilter = props => {
  const [selectedOptions, setSelectedOptions] = useState(new Set());
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [displayedOptions, setDisplayedOptions] = useState(props.options);
  const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(false);
  const [inputRef, setInputFocus] = useFocus();

  const keyPressArrowDown = useKeyPress('ArrowDown');
  const keyPressArrowUp = useKeyPress('ArrowUp');
  const keyPressEnter = useKeyPress('Enter');

  const toggleHighlightedOption = () => {
    const value = displayedOptions[highlightedIndex].value;
    if (!selectedOptions.has(value)) {
      setSelectedOptions(new Set(selectedOptions).add(value));
    } else {
      const newSet = new Set(selectedOptions);
      newSet.delete(value);
      setSelectedOptions(newSet);
    }
  };

  useEffect(() => {
    if (isComponentVisible) {
      if (keyPressArrowDown) {
        const newIndex = highlightedIndex + 1;
        setHighlightedIndex(newIndex < displayedOptions.length ? newIndex : highlightedIndex);
      }
      if (keyPressArrowUp) {
        const newIndex = highlightedIndex - 1;
        setHighlightedIndex(newIndex > 0 ? newIndex : 0);
      }
      if (keyPressEnter) {
        toggleHighlightedOption();
      }
    }
  }, [keyPressArrowDown, keyPressArrowUp, keyPressEnter]);

  // Unique id for this dropdown
  // TODO this does not work. It changes on every render
  const uniqId = shortid.generate();

  const toggleDropdown = () => {
    const newState = !isComponentVisible;
    setIsComponentVisible(newState);

    // Autofocus search input when opening the dropdown
    if (newState) {
      setTimeout(() => {
        setInputFocus();
      }, 0);
    }
  };

  const handleMouseOver = e => {
    setHighlightedIndex(parseInt(e.currentTarget.dataset.key));
  };

  const renderOptions = displayedOptions.map((option, i) => (
    <div className={`dropdown-option ${i === highlightedIndex ? 'highlighted' : ''}`} key={i} data-key={i} onMouseOver={handleMouseOver}>
      <input
        type="checkbox"
        value={option.value}
        onChange={toggleHighlightedOption}
        id={`${uniqId}-${i}`}
        data-index={i}
        checked={selectedOptions.has(option.value)}
      />
      <label
        className="dropdown-option-label"
        htmlFor={`${uniqId}-${i}`}
      >
        {option.name}
      </label>
    </div>
  ));

  // when you click reset, the selected options are set to the start again.
  const handleReset = () => {
    setSelectedOptions(new Set());
  };

  // Filter the options based on filter in filter
  const handleSubfilterChange = e => {
    setDisplayedOptions(props.options.filter(item => item.name.toLowerCase().includes(e.target.value.toLowerCase())));
  };

  return (
    <div className={`dropdown ${isComponentVisible ? 'open' : ''}`} ref={ref}>
      <button
        className="dropdown-toggle"
        onClick={toggleDropdown}
        aria-haspopup="true"
        aria-expanded="false"
        id=""
      >{props.title}</button>
      <div
        className="dropdown-content"
        aria-labelledby="dropdownMenuButton"
      >
        <input
          type="text"
          placeholder="Search a platfom"
          onChange={handleSubfilterChange}
          ref={inputRef}
        />

        {renderOptions}

        <div>
          <button className="btn btn-dim" onClick={handleReset}>Reset</button>
          {/*<button className="btn btn-primary" onClick={handleSubmit}>Save</button>*/}
        </div>
      </div>
    </div>
  )
};

DropdownFilter.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};

export default DropdownFilter;
