<p align="center"><img src="https://github.com/elastic/app-search-reference-ui-react/blob/master/logo-app-search.png?raw=true" alt="Elastic App Search Logo"></p>

<p align="center"><a href="https://circleci.com/gh/elastic/app-search-reference-ui-react"><img src="https://circleci.com/gh/elastic/app-search-reference-ui-react.svg?style=svg" alt="CircleCI buidl"></a>
<a href="https://github.com/elastic/app-search-reference-ui-react/releases"><img src="https://img.shields.io/github/release/elastic/app-search-reference-ui-react/all.svg?style=flat-square" alt="GitHub release" /></a></p>

> A configurable, generic search UI for
> any [Elastic App Search](https://www.elastic.co/cloud/search-lib-service) Engine.

## Contents

- [Getting started](#getting-started-)
- [Usage](#usage)
- [FAQ](#faq-)
- [Contribute](#contribute-)
- [License](#license-)

---

## Getting started 🐣

The Reference UI is great for:

- search demos
- functional tests of App Search Engine data
- a starting point for new search experiences

Requires [npm](https://www.npmjs.com/).

The README assumes that you have generated this code from within the App Search dashboard.

Run the following commands to start this application:

```bash
# Run the `cd` command to change the current directory to the
# location of your downloaded Reference UI. Replace the path
# below with the actual path of your project.
cd ~/Downloads/search-lib-reference-ui

# Run this to set everything up
npm install

# Run this to start your application and open it up in a new browser window
npm start
```

## Usage

### Updating configuration

The project can be configured via a JSON [config file](src/config/engine.json).

You can easily control things like...

- The Engine the UI runs against
- Which fields are displayed
- The filters that are used

If you would like to make configuration changes, there is no need to regenerate
this app from your App Search Dashboard!

You can simply open up the
[engine.json](src/config/engine.json) file, update the [options](#config),
and then restart this app.

### Configuration options <a id="config"></a>

The following is a complete list of options available for configuration in [engine.json](src/config/engine.json).

| option               | value type    | required/optional | source                                                                                                                                                                                 |
| -------------------- | ------------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `engineName`         | String        | required          | Found in your [App Search Dashboard](http://app.swiftype.com/as).                                                                                                                      |
| `hostIdentifier`     | String        | required          | Found in your [App Search Dashboard](http://app.swiftype.com/as).                                                                                                                      |
| `searchKey`          | String        | required          | Found in your [App Search Dashboard](http://app.swiftype.com/as).                                                                                                                      |
| `searchFields`       | Array[String] | required          | A list of fields that will be searched with your search term.                                                                                                                          |
| `resultFields`       | Array[String] | required          | A list of fields that will be displayed within your results.                                                                                                                           |
| `querySuggestFields` | Array[String] | optional          | A list of fields that will be searched and displayed as query suggestions.                                                                                                             |
| `titleField`         | String        | optional          | The field to display as the title in results.                                                                                                                                          |
| `urlField`           | String        | optional          | A field with a url to use as a link in results.                                                                                                                                        |
| `sortFields`         | Array[String] | optional          | A list of fields that will be used for sort options.                                                                                                                                   |
| `facets`             | Array[String] | optional          | A list of fields that will be available as "facet" filters. Read more about facets within the [App Search documentation](https://swiftype.com/documentation/search-lib/guides/facets). |

### External configuration

If you are embedding this app inside of another page, and you would like to
source the configuration from outside of the `engine.json` file,
you can simply write the configuration directly to `window.appConfig`.

### If you are checking this project out directly from GitHub... <a id="github"></a>

You can follow the previous steps, but then you will need to configure
[engine.json](src/config/engine.json).

To do so, make a copy of [engine.json.example](src/config/engine.json.example),
rename it to `engine.json` and configure it with your Engine's specific details.

```bash
cp src/config/engine.json.example src/config/engine.json
```

## Deploy and Share

This app can be easily published to any server as static assets and served. We recommend [Netlify](https://www.netlify.com/), but you have other [options](https://facebook.github.io/create-react-app/docs/deployment) as well.

To deploy:

```
npm run build
npm install netlify-cli -g
netlify deploy # enter ./build as the deploy path
```

You'll then simply follow the command prompt to log into Netlify and deploy your site. This can be completed in just a few minutes.

## Customization

This project is built with [Search UI](https://github.com/elastic/search-ui), which is a React library for building search experiences. If you're interested in using this project as a base for your own, most of
what you'll need can be found in the Search UI documentation.

## FAQ 🔮

### Where do I report issues with the Reference UI?

If something is not working as expected, please open an [issue](https://github.comelastice/app-search-reference-ui-react/issues/new).

### Where can I learn more about App Search?

Your best bet is to read the [documentation](https://swiftype.com/documentation/app-search).

### Where else can I go to get help?

You can checkout the [Elastic App Search community discuss forums](https://discuss.elastic.co/c/app-search).

## Contribute 🚀

We welcome contributors to the project. Before you begin, a couple notes...

- Before opening a pull request, please create an issue to [discuss the scope of your proposal](https://github.com/elastic/app-search-reference-ui-react/issues).
- Please write simple code and concise documentation, when appropriate.

## License 📗

[MIT](https://github.com/elastic/app-search-reference-ui-react/blob/master/LICENSE.md) © [Elastic](https://github.com/elastic)

Thank you to all the [contributors](https://github.com/elastic/app-search-reference-ui-react/graphs/contributors)!
