import React from "react";

import "./Header.css";

import SearchBox from "../containers/SearchBox";

export default function Header() {
  return (
    <div className="Header">
      <label className="Header-label" htmlFor="search">
        Search
      </label>
      <SearchBox />
    </div>
  );
}
