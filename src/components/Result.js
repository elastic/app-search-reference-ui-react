import PropTypes from "prop-types";
import React from "react";

function Result({ fields, title, url }) {
  return (
    <li className="result">
      <div className="result__header">
        {!url && (
          <span
            className="result__title"
            dangerouslySetInnerHTML={{ __html: title }}
          />
        )}
        {url && (
          <a
            href={url}
            target="_blank"
            className="result__title"
            dangerouslySetInnerHTML={{ __html: title }}
          />
        )}
      </div>
      <div className="result__body">
        <ul className="result__details">
          {Object.keys(fields).map(key => {
            return (
              <li key={key}>
                <strong>{key}</strong>:{" "}
                <span dangerouslySetInnerHTML={{ __html: fields[key] }} />
              </li>
            );
          })}
        </ul>
      </div>
    </li>
  );
}

Result.propTypes = {
  fields: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string
};

export default Result;
