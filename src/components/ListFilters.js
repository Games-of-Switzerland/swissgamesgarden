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

  // when you click reset, the selected options are set to the start again.
  const handleReset = () => {
    items.forEach(item => {
      if (item.selected) {
        toggleItem(item.key);
      }
    });

    inputRef.current.value = '';
    filterOutOptions('');
  };

  const handleSubfilterChange = e => {
    filterOutOptions(e.target.value);
  };

  return (
    <>
      <input
        className="form-control form-control-search"
        type="text"
        placeholder="Filter"
        onChange={handleSubfilterChange}
        ref={inputRef}
      />

      {displayedOptions.map((item, i) =>
        <CheckboxListItem
          key={item.key}
          onMouseOver={() => setCursor(i)}
          onChange={() => toggleItem(item.key)}
          highlighted={i === cursor}
          item={item}
        />)}

      <div>
        <button className="btn btn-dim" onClick={handleReset}>Reset</button>
        {/*<button className="btn btn-primary" onClick={handleSubmit}>Save</button>*/}
      </div>
    </>
  )
};

export default ListFilters;
