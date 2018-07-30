import PropTypes from "prop-types";
import React from "react";

import "./Result.css";

function Result({ fields, title }) {
  return (
    <div className="Result">
      <h3 dangerouslySetInnerHTML={{ __html: title }} />
      <dl>
        {Object.keys(fields).map(key => {
          return (
            <React.Fragment key={key}>
              <dt>{`${key}:`}</dt>
              <dd dangerouslySetInnerHTML={{ __html: fields[key] }} />
            </React.Fragment>
          );
        })}
      </dl>
    </div>
  );
}

Result.propTypes = {
  fields: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired
};

export default Result;
