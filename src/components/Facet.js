import React from "react";

import "./Facet.css";

function Facet({ name, options }) {
  return (
    <div className="Facet">
      <div className="Facet-title">{name}</div>
      <ul className="Facet-list">
        {options.map(option => (
          <div key={option.value}>
            {option.value} ({option.count})
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Facet;
