import PropTypes from "prop-types";
import React from "react";

function SearchBox(props) {
  const {
    isFocused,
    inputProps,
    onChange,
    onSelectSuggestion,
    onSubmit,
    showSuggestions,
    suggestions = [],
    value
  } = props;
  const focusedClass = isFocused ? "focus" : "";

  return (
    <React.Fragment>
      <form className="searchbox" onSubmit={onSubmit}>
        <input
          className={`searchbox__text-input ${focusedClass}`}
          onChange={onChange}
          type="text"
          value={value}
          placeholder="Search your documents&#8230;"
          {...inputProps}
        />
        <input
          type="submit"
          value="Search"
          className="button searchbox__submit"
        />
      </form>
      {showSuggestions && suggestions.length > 1 && (
        <div>
          {/* Using mousedown instead of click to ensure it has higher priority than
        blur handler*/}
          {suggestions.map(suggestion => (
            <div
              onMouseDown={() => onSelectSuggestion(suggestion)}
              key={suggestion.suggestion}
            >
              {suggestion.suggestion}
            </div>
          ))}
        </div>
      )}
    </React.Fragment>
  );
}

SearchBox.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  isFocused: PropTypes.bool
};

export default SearchBox;
