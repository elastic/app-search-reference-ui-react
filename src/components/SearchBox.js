import PropTypes from "prop-types";
import React from "react";

import "./SearchBox.css";

function SearchBox({ onChange, onSubmit, value }) {
  return (
    <form className="SearchBox" onSubmit={onSubmit}>
      <input
        className="SearchBox-input"
        onChange={onChange}
        type="text"
        value={value}
      />
      <button className="SearchBox-button">GO</button>
    </form>
  );
}

SearchBox.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

export default SearchBox;
