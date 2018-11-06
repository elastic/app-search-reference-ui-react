import React from "react";

import { SearchBox } from "@elastic/react-search-ui";

export default function Header() {
  return (
    <div className="reference-ui-header">
      <div className="reference-ui-header__search">
        <SearchBox />
      </div>
    </div>
  );
}
