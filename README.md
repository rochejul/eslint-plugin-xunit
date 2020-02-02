# eslint-plugin-xunit
Eslint plugin for xunit tests

![npm](https://img.shields.io/npm/v/eslint-plugin-xunit)
![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/rochejul/eslint-plugin-xunit)
[![GitHub license](https://img.shields.io/github/license/rochejul/eslint-plugin-xunit)](https://github.com/rochejul/eslint-plugin-xunit/blob/master/LICENSE)

[![Build Status](https://travis-ci.org/rochejul/eslint-plugin-xunit.svg?branch=master)](https://travis-ci.org/rochejul/eslint-plugin-xunit)[![Dependency Status](https://david-dm.org/rochejul/eslint-plugin-xunit.svg)](https://david-dm.org/rochejul/eslint-plugin-xunit)
[![devDependency Status](https://david-dm.org/rochejul/eslint-plugin-xunit/dev-status.svg)](https://david-dm.org/rochejul/eslint-plugin-xunit#info=devDependencies)

[![Known Vulnerabilities](https://snyk.io/test/github/rochejul/eslint-plugin-xunit/badge.svg)](https://snyk.io/test/github/rochejul/eslint-plugin-xunit)

[![NPM](https://nodei.co/npm/eslint-plugin-xunit.png?downloads=true&downloadRank=true)](https://nodei.co/npm/eslint-plugin-xunit/)
[![NPM](https://nodei.co/npm-dl/eslint-plugin-xunit.png?&months=6&height=3)](https://nodei.co/npm/eslint-plugin-xunit/)


This plugin ensures good usage of the xunit framework

## Install it

### Globally

````
npm install --global eslint-plugin-xunit
````

### In your project

````
npm install --save --save-exact eslint-plugin-xunit
````

## Configure your eslintrc file

Here an example of configuration which uses the plugin

```js
{
  // Instal the xunit plugin, please do:
  // > npm install -g eslint-plugin-xunit
  "plugins": [
    "xunit"
  ],
  "extends": [
    "plugin:xunit/recommended"
  ]
}
```

## Rules

 * [xunit/api](./docs/rules/xunit-api.md)
 * [xunit/async](./docs/rules/xunit-async.md)
 * [xunit/data](./docs/rules/xunit-data.md)
 * [xunit/fact](./docs/rules/xunit-fact.md)
 * [xunit/fixture](./docs/rules/xunit-fixture.md)
