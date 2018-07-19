import React from "react";

import "./Body.css";

import Meta from "../containers/Meta";
import Results from "../containers/Results";

export default function Body() {
  return (
    <div className="Body">
      <Meta />
      <Results />
    </div>
  );
}
