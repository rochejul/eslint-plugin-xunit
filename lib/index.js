const xunitFixtureRule = require('./rules/xunit-fixture');

module.exports = {
  rules: {
    'fixture': xunitFixtureRule
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
        ScrumTeam: 'readonly',
        ImportJson: 'readonly',
        Test: 'readonly',
        Fact: 'readonly',
        Data: 'readonly',
        Async: 'readonly',
        Skip: 'readonly',
        Records: 'readonly',
        Stubs: 'readonly',
        Mocks: 'readonly',
        Assert: 'readonly'
      },
      rules: {
        'xunit/fixture': 'error'
      }
    }
  }
};
