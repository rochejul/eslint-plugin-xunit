const xunitApiRule = require('./rules/xunit-api');
const xunitAsyncRule = require('./rules/xunit-async');
const xunitDataRule = require('./rules/xunit-data');
const xunitFactRule = require('./rules/xunit-fact');
const xunitFixtureRule = require('./rules/xunit-fixture');
const xunitSkipRule = require('./rules/xunit-skip');
const xunitTraitRule = require('./rules/xunit-trait');

module.exports = {
  rules: {
    api: xunitApiRule,
    async: xunitAsyncRule,
    data: xunitDataRule,
    fact: xunitFactRule,
    fixture: xunitFixtureRule,
    skip: xunitSkipRule,
    trait: xunitTraitRule
  },
  configs: {
    recommended: {
      extends: [
        'eslint:recommended'
      ],
      plugins: [
        'eslint-plugin-xunit'
      ],
      env: {
        browser: true,
        es6: false
      },
      parserOptions: {
        ecmaVersion: 5
      },
      globals: {
        Fixture: 'readonly',
        ImportJson: 'readonly',
        Test: 'readonly',
        Fact: 'readonly',
        Data: 'readonly',
        Async: 'readonly',
        Skip: 'readonly',
        Record: 'readonly',
        Stubs: 'readonly',
        Mocks: 'readonly',
        Assert: 'readonly',
        Trait: 'readonly'
      },
      rules: {
        'xunit/api': 'error',
        'xunit/async': 'error',
        'xunit/data': 'error',
        'xunit/fact': 'error',
        'xunit/fixture': 'error',
        'xunit/skip': 'error',
        'xunit/trait': 'error'
      }
    }
  }
};
