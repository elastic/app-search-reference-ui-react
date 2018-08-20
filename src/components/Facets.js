import PropTypes from "prop-types";
import React from "react";

function Facets({ children }) {
  return <div className="facets">{children}</div>;
}

Facets.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ]).isRequired
};

export default Facets;
