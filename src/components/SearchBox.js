import React from "react";
import "./SearchBox.css";

export default function SearchBox({ value, onChange }) {
  return (
    <form className="SearchBox">
      <input
        className="SearchBox-input"
        type="text"
        value={value}
        onChange={onChange}
      />
      <button className="SearchBox-button">GO</button>
    </form>
  );
}
