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
  const shouldShowSuggestions = !!showSuggestions && suggestions.length > 0;
  return (
    <form
      className={"searchbox" + (shouldShowSuggestions ? " query-suggest" : "")}
      onSubmit={onSubmit}
    >
      <div className="query-suggestions-wrapper">
        <input
          className={`searchbox__text-input ${focusedClass}`}
          onChange={onChange}
          type="text"
          value={value}
          placeholder="Search your documents&#8230;"
          {...inputProps}
        />
        {shouldShowSuggestions && (
          <ul className="query-suggestions">
            {/* Using mousedown instead of click to ensure it has higher priority than
        blur handler*/}
            {suggestions.map(suggestion => (
              <li key={suggestion.suggestion}>
                <a
                  onMouseDown={e => {
                    e.preventDefault();
                    onSelectSuggestion(suggestion);
                  }}
                  href=""
                >
                  {suggestion.suggestion}
                </a>
              </li>
            ))}
          </ul>
        )}
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
