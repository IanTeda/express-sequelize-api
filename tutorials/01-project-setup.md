# Create Github Repository & Initialize NPM

[Git Commit](https://github.com/IanTeda/express-sequelize-api/commit/7001616dd3fe6837d323cb49e4feb781796cfcc5)

Lets start by creating a new repository on Github and cloning into our local machine

## Create Repository on Github

[Github - Creating a new repository
](https://docs.github.com/en/free-pro-team@latest/github/creating-cloning-and-archiving-repositories/creating-a-new-repository)

## Clone Repository

Clone repository into local machine

```
git clone https://github.com/IanTeda/express-sequelize-api.git
```

## Initiate NPM Package

Initiate npm and create package.json

__Initiate NPM__
```
npm init
```

__NPM Init Questions__
```
package name: (express-sequelize-api) 
version: (1.0.0) 0.1.0
description: Express Sequelize API Template
entry point: (index.js) src/app.js
test command: 
git repository: (https://github.com/IanTeda/express-sequelize-api.git) 
keywords: Express, Sequelize, RESTful, API
author: Ian Teda <ian@teda.id.au>
license: (ISC) MIT
```

Resulting package.json
*./package.json*
```JSON
{
  "name": "express-sequelize-api",
  "version": "0.1.0",
  "description": "Express Sequelize API Template",
  "main": "src/app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/IanTeda/express-sequelize-api.git"
  },
  "keywords": [
    "Express",
    "Sequelize",
    "RESTful",
    "API"
  ],
  "author": "Ian Teda <ian@teda.id.au>",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/IanTeda/express-sequelize-api/issues"
  },
  "homepage": "https://github.com/IanTeda/express-sequelize-api#readme"
}
```
