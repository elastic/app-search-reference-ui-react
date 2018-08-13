import React from "react";

const AppSearchContext = React.createContext({
  searchTerm: "",
  totalResults: 0,
  current: 0,
  results: [],
  resultsPerPage: 0,
  updatePage: () => {},
  setSearchTerm: () => {}
});

export default AppSearchContext;
