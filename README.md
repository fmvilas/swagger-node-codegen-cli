# CLI for Swagger ES6 Node.js code generator

## Description

CLI for swagger-node-codegen. Use your API Swagger definition to generate the Node.js ES6-compliant code of your API.

The generated code features:

* ES6
* Gulp
* Makefile
* ESLint
* YAML config file
* Express

## How to use it?

```sh
npm install swagger-node-codegen-cli -g
```

Syntax:

```sh
snc [path/to/swagger.json] [path/to/target/directory]
```

Example:

```sh
snc ~/my-api.json ~/my-api
```

It will generate a directory structure like this:

```
.editorconfig
.eslintrc
Makefile
README.md
config
  common.yml
gulpfile.js
package.json
src
  api
    routes
      users.js
      products.js
    services
      users.js
      products.js
    index.js
  bin
    www
  lib
    config.js
    logger.js
```

## Author

Francisco Méndez Vilas ([fmvilas@gmail.com](mailto:fmvilas@gmail.com))

[www.fmvilas.com](http://www.fmvilas.com)
