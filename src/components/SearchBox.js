import React from "react";
import "./SearchBox.css";

export default function SearchBox({ value, onChange, onSubmit }) {
  return (
    <form className="SearchBox" onSubmit={onSubmit}>
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
