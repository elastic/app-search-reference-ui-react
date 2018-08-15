import React from "react";

import SearchBox from "../containers/SearchBox";

export default function Header() {
  return (
    <div className="reference-ui-header">
      <div className="reference-ui-header__search">
        <SearchBox />
      </div>
    </div>
  );
}
