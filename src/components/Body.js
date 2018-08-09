import React from "react";

import Facets from "../containers/Facets";
import Meta from "../containers/Meta";
import Paging from "../containers/Paging";
import Results from "../containers/Results";

export default function Body() {
  return (
    <div className="Body">
      <div className="Body-left">
        <Facets />
      </div>
      <div className="Body-right">
        <Meta />
        <Results />
        <Paging />
      </div>
    </div>
  );
}
