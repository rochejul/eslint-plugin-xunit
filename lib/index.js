const xunitApiRule = require('./rules/xunit-api');
const xunitDataRule = require('./rules/xunit-data');
const xunitFactRule = require('./rules/xunit-fact');
const xunitFixtureRule = require('./rules/xunit-fixture');

module.exports = {
  rules: {
    api: xunitApiRule,
    data: xunitDataRule,
    fact: xunitFactRule,
    fixture: xunitFixtureRule
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
        Records: 'readonly',
        Stubs: 'readonly',
        Mocks: 'readonly',
        Assert: 'readonly',
        Trait: 'readonly'
      },
      rules: {
        'xunit/api': 'error',
        'xunit/data': 'error',
        'xunit/fact': 'error',
        'xunit/fixture': 'error'
      }
    }
  }
};
