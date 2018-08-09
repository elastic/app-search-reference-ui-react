import React from "react";

import SearchBox from "../containers/SearchBox";

export default function Header() {
  const packageIcon = "fixme";
  const poweredBy = "fixme";

  return (
    <div className="search-demo__header">
      <div className="search-demo__headings">
        <div className="search-demo__icon-wrap">
          <img src={packageIcon} alt="Dog Icon" className="search-demo__icon" />
        </div>
        <h1 className="search-demo__title">Package Search</h1>
        <h3 className="search-demo__sub-heading powered-by">
          <img src={poweredBy} alt="Powered by Swiftype" />
        </h3>
      </div>
      <SearchBox />
    </div>
  );
}
