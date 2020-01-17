describe('xunit/fixture - ', () => {
  const { RuleTester } = require('eslint');

  const rule = require('../../lib/rules/xunit-fixture');

  const ruleTester = new RuleTester();
  ruleTester.run(
    'xunit/fixture',
    rule,
    {
      valid: [
        {
          code: `
[Fixture]
function myFixtureToTest() {
}`
        },
        {
          code: `
[Fixture]
Test.myTests.myHelper = function () {}`
        },
        {
          code: `
[Fixture]

function myFixtureToTest() {
}`
        },
        {
          code: `
[     Fixture    ]
function myFixtureToTest() {
}`
        },
        {
          code: `
   [Fixture]
function myFixtureToTest() {
}`
        },
        {
          code: `
[Fixture, DDDD]
function myFixtureToTest() {
}`
        }
      ],
      invalid: [
        {
          code:  `
[Fixture]`,
          errors: [
            {
              message: 'xunit Fixture should be associated to a function.'
            }
          ]
        },
        {
          code:  `
[Fixture]
var a = 5;
`,
          errors: [
            {
              message: 'xunit Fixture should be associated to a function.'
            }
          ]
        }
      ]
    }
  );
});
