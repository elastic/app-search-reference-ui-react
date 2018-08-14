import React from "react";

import Facets from "../containers/Facets";
import Meta from "../containers/Meta";
import Paging from "../containers/Paging";
import Results from "../containers/Results";
import ResultsPerPage from "../containers/ResultsPerPage";
import Sort from "../containers/Sort";
import { create } from "../types/SortOption";

export default function Body() {
  return (
    <div className="search-demo__body">
      <div className="search-results">
        <Sort
          sortOptions={[
            create({
              name: "None",
              value: "",
              direction: ""
            }),
            create({
              name: "Name ASC",
              value: "name",
              direction: "asc"
            }),
            create({
              name: "Name DESC",
              value: "name",
              direction: "desc"
            }),
            create({
              name: "License ASC",
              value: "license",
              direction: "asc"
            }),
            create({
              name: "License DESC",
              value: "license",
              direction: "desc"
            })
          ]}
        />
        <Facets />
        <div className="results">
          <div className="results__header">
            <Meta />
            <ResultsPerPage />
          </div>
          <div className="results__body">
            <Results />
          </div>
          <div className="results__footer">
            <Paging />
          </div>
        </div>
      </div>
    </div>
  );
}
