import PropTypes from "prop-types";
import React, { Component } from "react";

import withAppSearch from "../app-search/withAppSearch";
import Facets from "../components/Facets";
import Facet from "../components/Facet";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function findFacetValueInFilters(name, filters) {
  const filter = filters.find(f => Object.keys(f)[0] === name);
  if (!filter) return;
  return Object.values(filter)[0];
}

class FacetsContainer extends Component {
  static propTypes = {
    addFilter: PropTypes.func.isRequired,
    filters: PropTypes.arrayOf(PropTypes.object).isRequired,
    facets: PropTypes.object.isRequired,
    removeFilter: PropTypes.func.isRequired
  };

  render() {
    const { addFilter, filters, facets, removeFilter } = this.props;
    const facetNames = Object.keys(facets);
    if (!facetNames.length) return null;

    return (
      <Facets>
        {facetNames.map(name => {
          const options = facets[name][0].data;
          const selectedValue = findFacetValueInFilters(name, filters);
          if (!options.length && !selectedValue) return null;

          return (
            <Facet
              key={name}
              name={capitalizeFirstLetter(name)}
              onRemove={({ clickEvent, value }) => {
                clickEvent.preventDefault();
                removeFilter(name, value);
              }}
              onSelect={({ clickEvent, value }) => {
                clickEvent.preventDefault();
                addFilter(name, value);
              }}
              options={options}
              value={selectedValue}
            />
          );
        })}
      </Facets>
    );
  }
}

export default withAppSearch(FacetsContainer);
