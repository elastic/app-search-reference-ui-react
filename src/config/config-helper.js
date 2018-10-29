import config from "../config/engine.json";
import { SortOption } from "../types";

/**
 * This file abstracts most logic around the configuration of the Reference UI.
 *
 * Configuration is an important part of the "reusability" and "generic-ness" of
 * the Reference UI, but if you are using this app as a starting point for own
 * project, everything related to configuration can largely be thrown away. To
 * that end, this file attempts to contain most of that logic to one place.
 */

export function getConfig() {
  if (process.env.NODE_ENV === "test") {
    return {};
  }

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

export function getUrlFieldTemplate() {
  return getConfig().urlFieldTemplate;
}

export function getResultTitle(result) {
  const titleField = getTitleField();

  return result.getSnippet(titleField);
}

export function getResultUrl(result) {
  const urlField = getUrlField();
  if (urlField) return result.getRaw(urlField);

  const urlFieldTemplate = getUrlFieldTemplate();

  if (urlFieldTemplate) {
    const fieldValueReplacementRegex = /{{([^}]*)}}/g;
    let compiledUrlField = urlFieldTemplate;
    let match = fieldValueReplacementRegex.exec(urlFieldTemplate);

    while (match != null) {
      compiledUrlField = compiledUrlField.replace(
        match[0],
        result.getRaw(match[1])
      );
      match = fieldValueReplacementRegex.exec(urlFieldTemplate);
    }
    return compiledUrlField;
  }
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
        toLowerCase(getUrlField())
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
  const searchFields = (config.fields || []).reduce((acc, n) => {
    acc = acc || {};
    acc[n] = {};
    return acc;
  }, undefined);

  const resultFields = (config.fields || []).reduce((acc, n) => {
    acc = acc || {};
    acc[n] = {
      raw: {},
      snippet: {
        size: 100,
        fallback: true
      }
    };
    return acc;
  }, undefined);

  // We can't use url or title fields unless they're actually
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
      size: 10
    };
    return acc;
  }, undefined);

  return facets;
}

export function buildSortOptionsFromConfig() {
  const config = getConfig();
  return [
    SortOption.create({
      name: "Relevance",
      value: "",
      direction: ""
    }),
    ...(config.sortFields || []).reduce((acc, sortField) => {
      acc.push(
        SortOption.create({
          name: `${capitalizeFirstLetter(sortField)} ASC`,
          value: sortField,
          direction: "asc"
        })
      );
      acc.push(
        SortOption.create({
          name: `${capitalizeFirstLetter(sortField)} DESC`,
          value: sortField,
          direction: "desc"
        })
      );
      return acc;
    }, [])
  ];
}
