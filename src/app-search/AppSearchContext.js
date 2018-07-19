import React from "react";

const AppSearchContext = React.createContext({
  searchTerm: "",
  setSearchTerm: () => {},
  totalResults: 0,
  current: 0,
  size: 0,
  results: []
});

export default AppSearchContext;
