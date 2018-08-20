# App Search Reference UI

The Reference UI is a configurable, generic UI meant to work with
any [App Search](https://www.elastic.co/cloud/app-search-service) Engine. It
can serve as a simple demo, a functional test for your Engine data,
or as a code reference when building out your own App Search
UI.

The project can be configured via a JSON [config file](src/config/engine.json),
which allows you to easily control things like...

- The Engine the UI runs against
- Which fields are displayed
- The filters that are used

The README assumes that you have generated this code from within the App Search dashboard.

## Setup

You will need to install [npm](https://www.npmjs.com/). Once you have "npm"
installed, you should be able to use the `npm` command from within your
terminal.

Run the following commands to start this application:

```bash
# Run the `cd` command to change the current directory to the
# location of your downloaded Reference UI. Replace the path
# below with the actual path of your project.
cd ~/Downloads/app-search-reference-ui

# Run this to set everything up
npm install

# Run this to start your application and open it up in a new browser window
npm start
```

### Updating configuration

If you would like to make configuration changes, there is no need to regenerate
this app from your App Search Dashboard! You can simply open up the
[engine.json](src/config/engine.json) file, update the [options](#config),
and then restart this app.

### Configuration options <a id="config"></a>

The following is a complete list of options available for configuration in [engine.json](src/config/engine.json).

| option | value type | required/optional | source
| --- | --- | --- | --- |
| `engineName` | String | required | Found in your [App Search Dashboard](http://app.swiftype.com/as). |
| `hostIdentifier` | String | required | Found in your [App Search Dashboard](http://app.swiftype.com/as). |
| `searchKey` | String | required | Found in your [App Search Dashboard](http://app.swiftype.com/as). |
| `fields` | Array[String] | required | A list of fields that will be searched and displayed within your results. |
| `titleField` | String | optional | The field to display as the title in results. |
| `urlField` | String | optional | A field with a url to use as a link in results. |
| `urlFieldTemplate` | String | optional |  Instead of urlField, you can provide a URL "template" here, which lets you build a URL from other fields. ex: "https://www.example.com/{{id}}". |
| `sortFields` | Array[String] | required |  A list of fields that will be used for sort options. |
| `facets` | Array[String] | required |  A list of fields that will be available as "facet" filters. Read more about facets within the [App Search documentation](https://swiftype.com/documentation/app-search/guides/facets). |

### External configuration

If you are embedding this app inside of another page, and you would like to
source the configuration from outside of the `engine.json` file,
you can simply write the configuration directly to `window.appConfig`.

### If you are checking this project out directly from GitHub... <a id="github"></a>

You can follow the previous steps, but then you will need to configure
[engine.json](src/config/engine.json).

To do so, make a copy of [engine.json.example](src/config/engine.json.example),
rename it to `engine.json` and configure with your Engine's specific details.

```bash
cp src/config/engine.json.example src/config/engine.json
```
