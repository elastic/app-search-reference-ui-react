import React from "react";

const AppSearchContext = React.createContext({
  searchTerm: "",
  totalResults: 0,
  current: 0,
  size: 0,
  results: [],
  updatePage: () => {},
  setSearchTerm: () => {}
});

export default AppSearchContext;
