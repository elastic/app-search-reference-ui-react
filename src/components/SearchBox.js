import PropTypes from "prop-types";
import React from "react";

const querySuggestions = [
  "Wrangell–St. Elias",
  "Gates of the Arctic",
  "Denali",
  "Katmai",
  "Death Valley",
  "Glacier Bay",
  "Lake Clark",
  "Yellowstone",
  "Kobuk Valley",
  "Everglades"
]

function SearchBox(props) {
  const { isFocused, inputProps, onChange, onSubmit, value } = props;
  const focusedClass = isFocused ? "focus" : "";

  return (
    <form className={"searchbox" + (querySuggestions.length > 0 ? " query-suggest" : "")} onSubmit={onSubmit}>
        <div className="query-suggestions-wrapper">
          <input
            className={`searchbox__text-input ${focusedClass}`}
            onChange={onChange}
            type="text"
            value={value}
            placeholder="Search your documents&#8230;"
            {...inputProps}
          />
          <ul className="query-suggestions">
            <li><a href="">Wrangell–St. <em>Elias</em></a></li>
            <li><a href="">Gates of the Arctic</a></li>
            <li><a href="">Denali</a></li>
            <li><a href="">Katmai</a></li>
            <li><a href="">Death Valley</a></li>
            <li><a href="">Glacier Bay</a></li>
            <li><a href="">Lake Clark</a></li>
            <li><a href="">Yellowstone</a></li>
            <li><a href="">Kobuk Valley</a></li>
            <li><a href="">Everglades</a></li>
          </ul>
        </div>
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
  value: PropTypes.string.isRequired,
  isFocused: PropTypes.bool
};

export default SearchBox;
