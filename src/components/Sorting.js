import PropTypes from "prop-types";
import React from "react";

function Sorting({ searchTerm }) {
  return (
    <div className="sorting">
      <select id="sorting" name="sorting">
        <option value="" selected>Sort results</option>
        <option value="relevance">Relevance</option>
        <option value="price">Price</option>
        <option value="publication_date">Publication Date</option>
      </select>
    </div>
  );
}

Sorting.propTypes = {
  searchTerm: PropTypes.string.isRequired
};

export default Sorting;
