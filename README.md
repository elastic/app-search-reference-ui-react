# App Search Reference UI

The goal of this project is to provide generic UI to that can be used with
any [App Search](https://www.elastic.co/cloud/app-search-service) Engine.

## How it works

This app is configured through a json [config file](src/config/engine.json) that
is read at runtime.

Currently, this file must be configured manually after checkout before running
this project.

Eventually, the idea is to generate that config file dynamically from the
App Search dashboard and include it in a zipped download of this project. From
a UX standpoint, a user would simply click "Generate" from their
dashboard which would download this project (pre-configured for their engine)
and include some instructions on running.

## Usage

- Clone this repository
- Run `cp src/config/engine.json.example src/config/engine.json`
- Configure your credentials in `config/engine.json`
- Run `yarn`
- Run `yarn start`

## Component Structure

This project is structure in such a way that it mimics the eventual setup
of our UI toolkit.

For example:

```jsx
<AppSearchProvider driver={new AppSearchDriver(config)}>
  <div className="App">
    <SearchBox />
    <Meta />
    <Results />
  </div>
</AppSearchProvider>
```

`AppSearchProvider` - The "Provider" is configured at the top level of your App.
You pass it an instance of `AppSearchDriver`, which is configured for your
account and engine. This "Provider" uses React's "Context" API to hold state
and expose that state to other App Search components in the component tree.
`AppSearchDriver` - Non-React "driver" class. The idea is to hold all non-React
specific logic here, so that it can be shared across multiple toolkits
`containers/{SearchBox,Meta,Results}` - These are individual "Connected" App
Search Components. They are aware of state provided by AppSearchProvider and can
update that state as well. They have no "View" of their own, they simply hold
the logic. This means that any "View" component could be swapped in.

Not shown above, but included in this project:

`components/{SearchBox,Meta,Results,Result` - These are individual "View"
components. They have no logic and are not aware of App Search. They simply take
simple properties are render them. These would be the "default" views for
UI Toolkit, but could be easily swapped out.
`app-search/withAppSearch` - A higher order component that a Toolkit user could
use to connect any component to the App Search state. This enables users to
write their own components.

## TODO

- [ ] Paging
- [ ] URL State
- [ ] Configurable fields
- [ ] Snippets
