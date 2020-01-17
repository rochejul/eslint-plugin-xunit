describe('xunit/fact - ', () => {
  const { RuleTester } = require('eslint');

  const rule = require('../../lib/rules/xunit-fact');

  const ruleTester = new RuleTester();
  ruleTester.run(
    'xunit/fact',
    rule,
    {
      valid: [
        {
          code: `
function testing() {
  [Fact]
  function myFixtureToTest() {
  }
}`
        }
      ],
      invalid: [
        {
          code:  `
[Fact]`,
          errors: [
            {
              message: 'xunit Fact should be associated to a function.'
            }
          ]
        },
        {
          code:  `
[Fact]
var a = 5;
`,
          errors: [
            {
              message: 'xunit Fact should be associated to a function.'
            }
          ]
        },
        {
          code: `
[Fact]
function myFixtureToTest() {
}`,
          errors: [
            {
              message: 'xunit Fact should be used on global scope.'
            }
          ]
        }
      ]
    }
  );
});
