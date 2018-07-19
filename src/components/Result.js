import PropTypes from "prop-types";
import React from "react";

import "./Result.css";

function Result({ result }) {
  return <div className="Result">Hi I'm result</div>;
}

Result.propTypes = {
  result: PropTypes.object.isRequired
};

export default Result;
