import PropTypes from "prop-types";
import React from "react";

function ErrorBoundary({ children, error }) {
  if (error) {
    return <div className="search-error">{error}</div>;
  }

  return children;
}

ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ]).isRequired,
  error: PropTypes.string.isRequired
};

export default ErrorBoundary;
