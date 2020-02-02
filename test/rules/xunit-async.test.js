describe('xunit/async - ', () => {
  const { RuleTester } = require('eslint');

  const rule = require('../../lib/rules/xunit-async');

  const ruleTester = new RuleTester();
  ruleTester.run(
      'xunit/async',
      rule,
      {
          valid: [
              {
                  code:`
[Fact, Async]
function myFixtureToTest(callback) {
}`
              },
              {
                  code:`
[Fact, Data(myVar), Async]
function myFixtureToTest(data, callback) {
}`
              },
              {
                  code:`
[Fact, Async, Data(myVar)]
function myFixtureToTest(callback, data) {
}`
              },
              {
                  code:`
[Fact, Async]
function myFixtureToTest(callback) {
}`,
                  options: [
                      {
                          callbackParameterName: 'callback'
                      }
                  ]
              },
              {
                  code:`
[Fact, Data(myVar), Async]
function myFixtureToTest(data, callback) {
}`,
                  options: [
                      {
                        callbackParameterName: 'callback'
                      }
                  ]
              }
          ],
          invalid: [
              {
                  code:  `
[Async]
function myFixtureToTest(callback) {
}`,
                  errors: [
                      {
                          message: 'xunit Async should be associated to a Fact annotation.'
                      }
                  ]
              },
              {
                  code:  `
[Fact, Async]
function myFixtureToTest() {
}`,
                  errors: [
                      {
                          message: 'when using xunit Async, you should then declare in your function a parameter to retrieve the callback function.'
                      }
                  ]
              },
              {
                  code:  `
[Fact, Async, Data(myVar)]
function myFixtureToTest() {
}`,
                  errors: [
                      {
                          message: 'when using xunit Async, you should then declare in your function a parameter to retrieve the callback function.'
                      }
                  ]
              },
              {
                  code:  `
[Fact, Data(myVar), Async]
function myFixtureToTest(data) {
}`,
                  errors: [
                      {
                          message: 'when using xunit Async, you should then declare in your function a parameter to retrieve the callback function.'
                      }
                  ]
              },
              {
                  code:  `
[Fact, Async]
function myFixtureToTest(myCallback) {
}`,
                  options: [
                      {
                          callbackParameterName: 'callback'
                      }
                  ],
                  errors: [
                      {
                          message: 'xunit Async recommends to use this parameter name: "callback".'
                      }
                  ]
              },
              {
                  code:  `
[Fact, Data(myVar), Async]
function myFixtureToTest(data, myCallback) {
}`,
                  options: [
                      {
                        callbackParameterName: 'callback'
                      }
                  ],
                  errors: [
                      {
                          message: 'xunit Async recommends to use this parameter name: "callback".'
                      }
                  ]
              }
          ]
      }
  );
});
