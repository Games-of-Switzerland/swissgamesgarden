import React, {useState} from "react";
import PropTypes from "prop-types";
import shortid from 'shortid';

const DropdownFilter = props => {
  const [isOpen, toggleDropdown] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(new Set());

  // Unique id for this dropdown
  const uniqId = shortid.generate();

  const handleChangeOption = e => {
    if (e.target.checked) {
      // Add the selected option from Set.
      setSelectedOptions(selectedOptions.add(e.target.value));
    } else {
      // Remove the selected option from Set.
      selectedOptions.delete(e.target.value);
      setSelectedOptions(selectedOptions);
    }
  };

  const renderOptions = props.options.map((option, i) => (
    <label key={i} className="dropdown-option">
      <input type="checkbox" value={option.value} onChange={handleChangeOption} />
      {option.name}
    </label>
  ));

  return (
    <div className={`dropdown ${isOpen ? 'open' : ''}`}>
      <button
        className="dropdown-toggle"
        onClick={() => toggleDropdown(!isOpen)}
        aria-haspopup="true"
        aria-expanded="false"
        id=""
      >{props.title}</button>
      <div
        className="dropdown-content"
        aria-labelledby="dropdownMenuButton"
      >
        {renderOptions}
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
