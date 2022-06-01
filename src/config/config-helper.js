let config = {};
try {
  config = require("../config/engine.json");
}
catch (e) {
  if (e instanceof Error && e.code === "MODULE_NOT_FOUND")
    console.log("Configuration file not found");
  else
    throw e;
}

/**
 * This file abstracts most logic around the configuration of the Reference UI.
 *
 * Configuration is an important part of the "reusability" and "generic-ness" of
 * the Reference UI, but if you are using this app as a starting point for own
 * project, everything related to configuration can largely be thrown away. To
 * that end, this file attempts to contain most of that logic to one place.
 */

function getEnv() {
  if (!process.env.REACT_APP_ENGINE_NAME) {
    return {}
  }

  return {
    endpointBase: process.env.REACT_APP_ENDPOINT_BASE,
    engineName: process.env.REACT_APP_ENGINE_NAME,
    hostIdentifier: process.env.REACT_APP_HOST_IDENTIFIER,
    searchKey: process.env.REACT_APP_SEARCH_KEY,
    searchFields: process.env.REACT_APP_SEARCH_FIELDS.split(','),
    resultFields: process.env.REACT_APP_RESULT_FIELDS.split(','),
    querySuggestFields: process.env.REACT_APP_QUERY_SUGGESTION_FIELDS.split(','),
    titleField: process.env.REACT_APP_TITLE_FIELD,
    urlField: process.env.REACT_APP_URL_FIELD,
    thumbnailField: process.env.REACT_APP_THUMBNAIL_FIELD,
    sortFields: process.env.REACT_APP_SORT_FIELDS.split(','),
    facets: process.env.REACT_APP_FACETS.split(',')
  }
}

export function getConfig() {
  if (process.env.NODE_ENV === "test") {
    return {};
  }

  if (process.env.REACT_APP_ENGINE_NAME) return getEnv();

  if (config.engineName) return config;

  if (
    typeof window !== "undefined" &&
    window.appConfig &&
    window.appConfig.engineName
  ) {
    return window.appConfig;
  }

  return {};
}

function toLowerCase(string) {
  if (string) return string.toLowerCase();
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getTitleField() {
  // If no title field configuration has been provided, we attempt
  // to use a "title" field, if one exists
  return getConfig().titleField || "title";
}

export function getUrlField() {
  return getConfig().urlField;
}

export function getThumbnailField() {
  return getConfig().thumbnailField;
}

export function getFacetFields() {
  return getConfig().facets || [];
}

export function getSortFields() {
  return getConfig().sortFields || [];
}

export function getResultTitle(result) {
  const titleField = getTitleField();

  return result.getSnippet(titleField);
}

// Because if a field is configured to display as a "title", we don't want
// to display it again in the fields list
export function stripUnnecessaryResultFields(resultFields) {
  return Object.keys(resultFields).reduce((acc, n) => {
    if (
      [
        "_meta",
        "id",
        toLowerCase(getTitleField()),
        toLowerCase(getUrlField()),
        toLowerCase(getThumbnailField()),
      ].includes(toLowerCase(n))
    ) {
      return acc;
    }

    acc[n] = resultFields[n];
    return acc;
  }, {});
}

export function buildSearchOptionsFromConfig() {
  const config = getConfig();
  const searchFields = (config.searchFields || config.fields || []).reduce(
    (acc, n) => {
      acc = acc || {};
      acc[n] = {};
      return acc;
    },
    undefined
  );

  const resultFields = (config.resultFields || config.fields || []).reduce(
    (acc, n) => {
      acc = acc || {};
      acc[n] = {
        raw: {},
        snippet: {
          size: 100,
          fallback: true
        }
      };
      return acc;
    },
    undefined
  );

  // We can't use url, thumbnail, or title fields unless they're actually
  // in the reuslts.
  if (config.urlField) {
    resultFields[config.urlField] = {
      raw: {},
      snippet: {
        size: 100,
        fallback: true
      }
    };
  }

  if (config.thumbnailField) {
    resultFields[config.thumbnailField] = {
      raw: {},
      snippet: {
        size: 100,
        fallback: true
      }
    };
  }

  if (config.titleField) {
    resultFields[config.titleField] = {
      raw: {},
      snippet: {
        size: 100,
        fallback: true
      }
    };
  }

  const searchOptions = {};
  searchOptions.result_fields = resultFields;
  searchOptions.search_fields = searchFields;
  return searchOptions;
}

export function buildFacetConfigFromConfig() {
  const config = getConfig();

  const facets = (config.facets || []).reduce((acc, n) => {
    acc = acc || {};
    acc[n] = {
      type: "value",
      size: 100
    };
    return acc;
  }, undefined);

  return facets;
}

export function buildSortOptionsFromConfig() {
  const config = getConfig();
  return [
    {
      name: "Relevance",
      value: "",
      direction: ""
    },
    ...(config.sortFields || []).reduce((acc, sortField) => {
      acc.push({
        name: `${capitalizeFirstLetter(sortField)} ASC`,
        value: sortField,
        direction: "asc"
      });
      acc.push({
        name: `${capitalizeFirstLetter(sortField)} DESC`,
        value: sortField,
        direction: "desc"
      });
      return acc;
    }, [])
  ];
}

export function buildAutocompleteQueryConfig() {
  const querySuggestFields = getConfig().querySuggestFields;
  if (
    !querySuggestFields ||
    !Array.isArray(querySuggestFields) ||
    querySuggestFields.length === 0
  ) {
    return {};
  }

  return {
    suggestions: {
      types: {
        documents: {
          fields: getConfig().querySuggestFields
        }
      }
    }
  };
}
