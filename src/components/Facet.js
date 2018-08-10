import PropTypes from "prop-types";
import React from "react";

function Facet({ name, onRemove, onSelect, options, value }) {
  return (
    <div className="facets__control">
      <div>
        <div className="facets__title">{name}</div>
        <ul className="facets__list">
          {value && (
            <li className="facet__selected">
              {value}{" "}
              <span class="facet__remove">
                (
                <a
                  onClick={clickEvent => onRemove({ clickEvent, value })}
                  href="/"
                >
                  Remove
                </a>
                )
              </span>
            </li>
          )}
          {!value &&
            options.map(option => (
              <li className="facet" key={option.value}>
                <a
                  className="facet__link"
                  href="/"
                  onClick={clickEvent =>
                    onSelect({ clickEvent, value: option.value })
                  }
                >
                  {option.value}
                </a>{" "}
                <span className="facet__count">{option.count}</span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

Facet.propTypes = {
  name: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  value: PropTypes.string
};

export default Facet;
