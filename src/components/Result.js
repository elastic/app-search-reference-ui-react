import React from "react";
import "./Result.css";

export default function Result({ result }) {
  if (!result) return null;
  return <div className="Result">Hi I'm result</div>;
}
