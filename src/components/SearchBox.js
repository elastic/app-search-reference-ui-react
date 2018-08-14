import PropTypes from "prop-types";
import React from "react";

function SearchBox({ onChange, onSubmit, onFocus, value }) {
  return (
    <form className={"searchbox " + onFocus} onSubmit={onSubmit}>
      <input
        className="searchbox__text-input"
        onChange={onChange}
        type="text"
        value={value}
        placeholder="Search your documents&#8230;"
      />
      <input
        type="submit"
        value="Search"
        className="button searchbox__submit"
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
