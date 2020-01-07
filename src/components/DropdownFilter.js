import React, {useState} from "react";
import PropTypes from "prop-types";

const DropdownFilter = props => {
  const [isOpen, toggleDropdown] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(new Set());

  const handleChangeOption = e => {
    if (e.target.checked) {
      setSelectedOptions(selectedOptions.add(e.target.value));
    } else {
      setSelectedOptions(selectedOptions.);
    }
      console.log(selectedOptions);
  };

  const renderOptions = props.options.map((option, i) => (
    <label key={i} className="dropdown-option">
      <input type="checkbox" value={option.value} onChange={handleChangeOption} />
      {option.name}
    </label>
  ));

  return (
    <div className="dropdown">
      <button className="dropdown-toggle" onClick={() => toggleDropdown(!isOpen)}>{props.title}</button>
      <div className="dropdown-content">
        {renderOptions}
      </div>
    </div>
  )
};

DropdownFilter.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default DropdownFilter;
