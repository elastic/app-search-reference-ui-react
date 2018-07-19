import React from "react";
import "./Results.css";

import Result from "./Result";

export default function Results({ results }) {
  if (!results) return null;
  return (
    <div className="Results">
      {results.map(result => (
        <Result key={result.getRaw("id")} result={result} />
      ))}
    </div>
  );
}
