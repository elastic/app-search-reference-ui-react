import PropTypes from "prop-types";
import React from "react";

function Facets({ children }) {
  return <div className="facets">{children}</div>;
}

Facets.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired
};

export default Facets;
