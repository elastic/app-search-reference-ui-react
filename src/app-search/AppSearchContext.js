import React from "react";

export const AppSearchContext = React.createContext({
  searchTerm: "",
  setSearchTerm: () => {},
  totalResults: 0,
  currentItem: 0,
  size: 0,
  results: []
});
