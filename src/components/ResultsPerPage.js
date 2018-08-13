import PropTypes from "prop-types";
import React from "react";

function ResultsPerPage({ onChange, options, value }) {
  return (
    <div className="results-per-page">
      <select name="results-per-page" value={value} onChange={onChange}>
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

ResultsPerPage.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.number).isRequired,
  value: PropTypes.number
};

export default ResultsPerPage;
