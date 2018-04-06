# What may become a [Stripes](https://github.com/folio-org/stripes-core/) client for [Glint](https://github.com/indexdata/glint)

## Pre-requisites

Install [NodeJS](https://nodejs.org/) and [Yarn](https://yarnpkg.com/) as appropriate for your operating system. 

Configure Yarn to fetch FOLIO packages from our CI system as this is being developed against the current codebase rather than releases:
```
yarn config set @folio:registry https://repository.folio.org/repository/npm-folioci/
```

Install [stripes-cli](https://github.com/folio-org/stripes-cli/) to be available globally for your user:
```
yarn global add @folio/stripes-cli
```

Installing stripes-cli will make the `stripes` binary available from your Yarn bin directory which may not be in your path. `yarn global bin` will let you know where to find it.

## Running a development server

Change to the directory where you have checked out this repository.

Install dependencies:
```
yarn install
```

Configure Stripes: Copy `stripes.config.example.js` to `stripes.config.js` and modify it as appropriate to your Glint deployment.

Use stripes-cli to bundle the system via webpack and run a webserver that makes it accessible at http://localhost:3000/ by default:
```
stripes serve stripes.config.js
```

Navigating to that page will hopefully allow you to browse datasets on a Glint server running at the URL you specified in the configuration file passed to `stripes serve`.

## Building static assets for deployment

To bundle the Stripes client for deployment via CDN, webserver, or Glint itself, you can use [`stripes build`](https://github.com/folio-org/stripes-cli/blob/master/doc/commands.md#build-command). Currently Glint requires assets to be requested with a prefix that can be set via the `--publicPath` option:
```
stripes build stripes.config.js <directory to output to> --publicPath=/stripesAssets/
```

## Upgrading

This is all still very much under development. Beyond pulling new commits to this repo, remember to run `yarn install` after and keep `stripes-cli` up to date:
```
git pull
yarn install
yarn global upgrade @folio/stripes-cli
```
