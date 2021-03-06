# DEPRECATED: Use [swagger-node-codegen](https://github.com/fmvilas/swagger-node-codegen) instead.

---

# CLI for Swagger ES6 Node.js code generator

## Description

CLI for [swagger-node-codegen](https://github.com/fmvilas/swagger-node-codegen). Use your API Swagger definition to generate the Node.js ES6-compliant code of your API.

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
snc [path/to/swagger/file] [path/to/target/directory]
```

> Swagger file can be either JSON or YAML.

Example:

```sh
snc ~/my-api.json ~/my-api
```

If none of the arguments above are provided then you'll be prompted for them:

![](images/snc.png)

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
