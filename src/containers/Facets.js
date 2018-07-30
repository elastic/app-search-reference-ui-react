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
    facets: PropTypes.object.isRequired
  };

  render() {
    const { facets } = this.props;
    const facetNames = Object.keys(facets);
    if (facetNames.length === 0) return null;

    return (
      <Facets>
        {facetNames.map(name => (
          <Facet
            key={name}
            name={capitalizeFirstLetter(name)}
            options={facets[name][0].data}
            onSelect={() => {}}
          />
        ))}
      </Facets>
    );
  }
}

export default withAppSearch(FacetsContainer);
