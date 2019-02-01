<p align="center"><img src="https://github.com/swiftype/app-search-reference-ui-react/blob/master/logo-app-search.png?raw=true" alt="Elastic App Search Logo"></p>

<p align="center"><a href="https://circleci.com/gh/swiftype/app-search-reference-ui-react"><img src="https://circleci.com/gh/swiftype/app-search-reference-ui-react.svg?style=svg" alt="CircleCI buidl"></a>
<a href="https://github.com/swiftype/app-search-reference-ui-react/releases"><img src="https://img.shields.io/github/release/swiftype/app-search-reference-ui-react/all.svg?style=flat-square" alt="GitHub release" /></a></p>

> A configurable, generic search UI for
any [Elastic App Search](https://www.elastic.co/cloud/search-lib-service) Engine.

## Contents

+ [Getting started](#getting-started-)
+ [Usage](#usage)
+ [FAQ](#faq-)
+ [Contribute](#contribute-)
+ [License](#license-)

***

## Getting started 🐣

The Reference UI is great for:

+ search demos
+ functional tests of App Search Engine data
+ a starting point for new search experiences

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

+ The Engine the UI runs against
+ Which fields are displayed
+ The filters that are used

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
| `fields`             | Array[String] | required          | A list of fields that will be searched and displayed within your results.                                                                                                              |
| `querySuggestFields` | Array[String] | optional          | A list of fields that will be searched and displayed as query suggestions.                                                                                                             |
| `titleField`         | String        | optional          | The field to display as the title in results.                                                                                                                                          |
| `urlField`           | String        | optional          | A field with a url to use as a link in results.                                                                                                                                        |
| `urlFieldTemplate`   | String        | optional          | Instead of urlField, you can provide a URL "template" here, which lets you build a URL from other fields. ex: "https://www.example.com/{{id}}".                                        |
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

## Understanding the Reference UI Code

In addition to previewing your data in a UI, this project can also be used as a code reference. Here's a quick primer on this project's code setup, to help you understand how it's put together.

Logically, the pieces of this application fit together like this:

```
  ------------------
  | App Search API |
  ------------------
      ^
      |
      |
    ( State manager )       ( Syncs state with URL )
  -------------------      --------------
  | SearchDriver     | <--> | URLManager |
  -------------------      --------------
      |
      | actions / state
      v
  ---------------------
  | SearchProvider    |  ( Driver to React glue )
  ---------------------
      |
      | context
      v
  --------------
  | Containers |  ( Behavior )
  --------------
      |
      |
  --------------
  | Components |  ( View )
  --------------
```

That corresponds to the code and file structure in the following way:

**src/search-lib**

Everything in this directory for now should be thought of as a separate library.
The goal eventually is to actually separate this out into a library of its own,
so when composing a UI you'd simply need to focus on creating components
from actions and state, and not all of the plumbing that goes into managing
that state. For now though, it's included in this reference as a pattern
that can be followed.

This holds the `SearchDriver`, the `URLManager`, and `SearchProvider`
from the diagram above. This is where all of the core application logic lives.
The interface to all of this logic is a set of "actions" and "state" that are
passed down in a React [Context](https://reactjs.org/docs/context.html). Those
actions and state are then consumed by Components and Containers.

If you've used Redux before, this concept should sound familiar.

_state_ - All of the core "state" of the applications is managed in a single store
at the top level. ex:

```
{
  current: 1, // The current page in pagination
  searchTerm: "", // The current search term
  results: [], // Results of the current search
  ...
}
```

_actions_ - Actions are how you change the state:

```
  addFilter: () => { ... },
  removeFilter: () => { ... },
  setSearchTerm: : () => { ... },
```

Calling an action will typically:

1. Make a call the App Search API with the new query details.
2. Update `results` in state with the results of the new query.
3. Update the url with the new query details.
4. Notify listeners that state changed (i.e., pass updated `results` as props
   to components so they can re-render)

So, for instance, a `SearchBox` component might be wired up to call the
`setSearchTerm` action with updated terms any time a user submits a search box
value. A `Results` component could then simply iterate through the `results`
from state to render search results.

**src/containers**

Components in this UI are separated into "Containers" and "Components". These
can be thought of as "Logic" and "View", respectively.

"Containers" are "connected" to the "context" via a "Higher Order Component"
(HOC) `withSearch`. This HOC simply exposes all state and actions as `props`.
A consuming Container simply accesses those actions and state, composes
appropriate handlers and data as props and passes them to the appropriate
Component.

**src/components**

Components are simply view templates. They take `props` and render
them in markup. They have no state of their own.

**src/config**

Being that this is a "generic" UI that is usable with any engine via
configuration, it should be no surprise that there is a fair amount of logic
around that. Configuration logic is not very useful for a code reference,
so the majority of that logic is encapsulated here to keep other code
references clean.

## Customization

It should be feasible to use this project as a starting point for your
own implementation. Here are a few places to look to make changes:

- The styles for the entire project can be found in [src/styles](src/styles).
  Simple style tweaks can be made here, or you could replace these styles
  entirely with your own.
- [src/components](src/components) contains the view templates for
  components. Structural HTML changes can be made here.
- If you find that you have different data or behavior requirements for
  existing components, you can customize the component Containers in
  [src/containers](src/containers).
- If you find you have requirements that none of the existing components
  satisfy, you could create an entirely new component and/or container. Use the
  [withSearch.js](src/search-lib/withSearch.js) HOC in order to access any action or state.
- The SearchDriver can be configured directly in [App.js](src/App.js) to do things like:

  - Optimize your API calls
  - Add additional facets and customize facet behavior
  - Disable URL State management

  A full list of configuration options can be found in [SearchDriver.js](src/search-lib/SearchDriver.js)

- Eject from 'configuration'. You may choose to to delete the entire [src/config](src/config) directory, which holds the configuration logic that makes this a
  generic UI. If you're using this as your own, production application, you likely
  won't need this.

- Lastly, if you find there is a core action or state missing, you may
  consider updating the core logic in [src/search-lib](src/search-lib).

## FAQ 🔮

### Where do I report issues with the Reference UI?

If something is not working as expected, please open an [issue](https://github.com/swiftype/app-search-reference-ui-react/issues/new).

### Where can I learn more about App Search?

Your best bet is to read the [documentation](https://swiftype.com/documentation/app-search).

### Where else can I go to get help?

You can checkout the [Elastic App Search community discuss forums](https://discuss.elastic.co/c/app-search).

## Contribute 🚀

We welcome contributors to the project. Before you begin, a couple notes...

+ Before opening a pull request, please create an issue to [discuss the scope of your proposal](https://github.com/swiftype/app-search-reference-ui-react/issues).
+ Please write simple code and concise documentation, when appropriate.

## License 📗

[MIT](https://github.com/swiftype/app-search-reference-ui-react/blob/master/LICENSE.md) © [Elastic](https://github.com/elastic)

Thank you to all the [contributors](https://github.com/swiftype/app-search-reference-ui-react/graphs/contributors)!
