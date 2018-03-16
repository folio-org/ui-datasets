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

## Running a development server

Change to the directory where you have checked out this repository.

Install dependencies:
```
yarn install
```

Use stripes-cli to bundle the system via webpack and run a webserver that makes it accessible at http://localhost:3003/ by default:
```
stripes serve stripes.config.js
```

Navigating to that page will hopefully allow you to browse datasets on a Glint server running at http://localhost:8088 (URL currently hardcoded in index.js, this is early).