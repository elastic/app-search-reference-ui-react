import React from "react";

import "./Body.css";

import Meta from "../containers/Meta";
import Paging from "../containers/Paging";
import Results from "../containers/Results";

export default function Body() {
  return (
    <div className="Body">
      <Meta />
      <Results />
      <Paging />
    </div>
  );
}
