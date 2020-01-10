import React, {useEffect, useState} from "react";
import useFocus from "../utilities/useFocus";
import CheckboxListItem from "./CheckboxListItem";
import {useKeyboardNavigation} from "../utilities";
import {useKeyPressEvent} from "react-use";

const ListFilters = props => {
  const {items, toggleItem} = props;

  const [displayedOptions, setDisplayedOptions] = useState(items);

  const [cursor, setCursor] = useKeyboardNavigation(displayedOptions.length - 1);
  const [inputRef, setInputFocus] = useFocus();

  const [subfilter, setSubfilter] = useState('');

  // Filter the options based on filter in filter
  const filterOutOptions = value => {
    setDisplayedOptions(items.filter(item =>
      item.key.toLowerCase().includes(value.toLowerCase()))
    );
  };

  useKeyPressEvent('Enter', () => {
    if (displayedOptions.length) toggleItem(displayedOptions[cursor].key);
  });

  // Autofocus
  useEffect(() => {
    setInputFocus();
  }, []);

  // Make sure that the displayed items are updated when the items change
  useEffect(() => {
    filterOutOptions(inputRef.current.value)
  }, [items]);

  // Update the list based on subfilter.
  useEffect(() => {
    filterOutOptions(subfilter);
  }, [subfilter]);

  // when you click reset, the selected options are set to the start again.
  const handleReset = () => {
    items.forEach(item => {
      if (item.selected) {
        toggleItem(item.key);
      }
    });

    setSubfilter('');
  };

  return (
    <>
      <input
        className="form-control form-control-search"
        type="text"
        placeholder="Filter"
        onChange={e => setSubfilter(e.target.value)}
        ref={inputRef}
        value={subfilter}
      />

      <div className="dropdown-options">
        {displayedOptions.length ?
          displayedOptions.map((item, i) => (
            <CheckboxListItem
              key={item.key}
              onMouseOver={() => setCursor(i)}
              onChange={() => toggleItem(item.key)}
              highlighted={i === cursor}
              item={item}
            />
          )) :
          <div>No results for "{subfilter}".</div>
        }
      </div>

      <div className="dropdown-btns">
        <button className="btn btn-dim" onClick={handleReset}>Reset</button>
        {/*<button className="btn btn-primary" onClick={handleSubmit}>Save</button>*/}
      </div>
    </>
  )
};

export default ListFilters;
