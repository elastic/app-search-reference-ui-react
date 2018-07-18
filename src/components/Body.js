import React from "react";
import "./Body.css";

import Results from "../containers/Results";
import Meta from "../containers/Meta";

export default function Body() {
  return (
    <div className="Body">
      <Meta />
      <Results />
    </div>
  );
}
