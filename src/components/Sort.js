import PropTypes from "prop-types";
import React from "react";

function Sort({ onChange, options, value }) {
  return (
    <div className="sort">
      <select name="sort" value={value} onChange={onChange}>
        <option value="">None</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}

Sort.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, value: PropTypes.string })
  ).isRequired,
  value: PropTypes.string
};

export default Sort;
