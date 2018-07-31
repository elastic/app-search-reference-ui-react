import React from "react";

import "./Facet.css";

function Facet({ name, onSelect, options }) {
  return (
    <div className="Facet">
      <div className="Facet-title">{name}</div>
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
    </div>
  );
}

export default Facet;
