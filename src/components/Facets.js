import PropTypes from "prop-types";
import React, { Component } from "react";

import { withSearch, Facet } from "@elastic/react-search-ui";
import { SingleValueLinksFacet } from "@elastic/react-search-components";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export class FacetsContainer extends Component {
  static propTypes = {
    facets: PropTypes.object.isRequired
  };

  render() {
    const { facets } = this.props;
    const facetNames = Object.keys(facets);
    if (!facetNames.length) return null;

    return (
      <div className="facets">
        {facetNames.map(name => {
          return (
            <Facet
              key={name}
              label={capitalizeFirstLetter(name)}
              field={name}
              render={SingleValueLinksFacet}
            />
          );
        })}
      </div>
    );
  }
}

export default withSearch(FacetsContainer);
