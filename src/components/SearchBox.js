import PropTypes from "prop-types";
import React from "react";

function SearchBox({ onChange, onSubmit, value }) {
  return (
    <form className="search-demo__input-wrapper" onSubmit={onSubmit}>
      <input
        className="search-demo__text-input"
        onChange={onChange}
        type="text"
        value={value}
      />
      <input
        type="submit"
        value="Search"
        className="button search-demo__submit"
      />
    </form>
  );
}

SearchBox.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

export default SearchBox;
