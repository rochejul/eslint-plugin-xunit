describe('xunit/trait - ', () => {
  const { RuleTester } = require('eslint');

  const rule = require('../../lib/rules/xunit-trait');

  const ruleTester = new RuleTester();
  ruleTester.run(
      'xunit/data',
      rule,
      {
          valid: [
              {
                  code:`
[Fact, Trait('my trait')]
function myFixtureToTest(data) {
}`
              },
              {
                  code:`
[Fixture, Trait('my trait')]
function myFixtureToTest(data) {
}`
              }
          ],
          invalid: [
              {
                  code:  `
[Trait]
function myFixtureToTest(data) {
}`,
                  errors: [
                      {
                          message: 'xunit Trait should be associated to a Fact or Fixture annotation.'
                      }
                  ]
              },
              {
                code:  `
[Trait('a trait')]
function myFixtureToTest(data) {
}`,
                errors: [
                    {
                        message: 'xunit Trait should be associated to a Fact or Fixture annotation.'
                    }
                ]
            },
            {
              code:  `
[Fixture, Trait]
function myFixtureToTest(data) {
}`,
              errors: [
                  {
                      message: 'xunit Trait should be a function with one parameter.'
                  }
              ]
            },
            {
              code:  `
[Fact, Trait]
function myFixtureToTest(data) {
}`,
              errors: [
                  {
                      message: 'xunit Trait should be a function with one parameter.'
                  }
              ]
            }
          ]
      }
  );
});
