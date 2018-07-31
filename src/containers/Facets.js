import PropTypes from "prop-types";
import React, { Component } from "react";

import withAppSearch from "../app-search/withAppSearch";
import Facets from "../components/Facets";
import Facet from "../components/Facet";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

class FacetsContainer extends Component {
  static propTypes = {
    addFilter: PropTypes.func.isRequired,
    facets: PropTypes.object.isRequired
  };

  render() {
    const { addFilter, facets } = this.props;
    const facetNames = Object.keys(facets);
    if (!facetNames.length) return null;

    return (
      <Facets>
        {facetNames.map(name => {
          const options = facets[name][0].data;
          if (!options.length) return null;

          return (
            <Facet
              key={name}
              name={capitalizeFirstLetter(name)}
              onSelect={({ clickEvent, value }) => {
                clickEvent.preventDefault();
                addFilter(name, value);
              }}
              options={options}
            />
          );
        })}
      </Facets>
    );
  }
}

export default withAppSearch(FacetsContainer);
