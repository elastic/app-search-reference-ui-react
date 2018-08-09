import PropTypes from "prop-types";
import React from "react";

function Facets({ children }) {
  return <div className="Facets">{children}</div>;
}

Facets.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired
};

export default Facets;
