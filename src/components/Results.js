import PropTypes from "prop-types";
import React from "react";

function Results({ children }) {
  return <ul>{children}</ul>;
}

Results.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ]).isRequired
};

export default Results;
