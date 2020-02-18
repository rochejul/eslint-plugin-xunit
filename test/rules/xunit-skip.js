describe('xunit/skip - ', () => {
    const { RuleTester } = require('eslint');

    const rule = require('../../lib/rules/xunit-skip');

    const ruleTester = new RuleTester();
    ruleTester.run(
        'xunit/data',
        rule,
        {
            valid: [
                {
                    code:`
[Fact, Skip]
function myFixtureToTest(data) {
}`
                },
                {
                    code:`
[Fact, Skip('why not?')]
function myFixtureToTest(data) {
}`
                },
                {
                    code:`
[Fixture, Skip]
function myFixtureToTest(data) {
}`
                },
                {
                    code:`
[Fixture, Skip('why not?')]
function myFixtureToTest(data) {
}`
                }
            ],
            invalid: [
                {
                    code:  `
[Skip]
function myFixtureToTest(data) {
}`,
                    errors: [
                        {
                            message: 'xunit Skip should be associated to a Fact or Fixture annotation.'
                        }
                    ]
                },
                {
                    code:  `
[Skip('why not?')]
function myFixtureToTest(data) {
}`,
                    errors: [
                        {
                            message: 'xunit Skip should be associated to a Fact or Fixture annotation.'
                        }
                    ]
                },
                {
                    code:  `
[Fact, Skip('why not?', 'yes, why not?')]
function myFixtureToTest(data) {
}`,
                    errors: [
                        {
                            message: 'xunit Skip should be a function with zero or one parameter.'
                        }
                    ]
                }
            ]
        }
    );
});
