import React from "react";

import "./Facet.css";

function Facet({ name, onRemove, onSelect, options, value }) {
  return (
    <div className="Facet">
      <div className="Facet-title">{name}</div>
      {value && (
        <div>
          {value}{" "}
          <a onClick={clickEvent => onRemove({ clickEvent, value })} href="/">
            X
          </a>
        </div>
      )}
      {!value && (
        <ul className="Facet-list">
          {options.map(option => (
            <div key={option.value}>
              <a
                href="/"
                onClick={clickEvent =>
                  onSelect({ clickEvent, value: option.value })
                }
              >
                {option.value}
              </a>{" "}
              ({option.count})
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Facet;
