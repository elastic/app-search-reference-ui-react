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
