describe('xunit/data - ', () => {
    const { RuleTester } = require('eslint');

    const rule = require('../../lib/rules/xunit-data');

    const ruleTester = new RuleTester();
    ruleTester.run(
        'xunit/data',
        rule,
        {
            valid: [
                {
                code:`
[Fact, Data(myVar)]
function myFixtureToTest() {
}`
                }
            ],
            invalid: [
                {
                    code:  `
[Data(myVar)]
function myFixtureToTest() {
}`,
                    errors: [
                        {
                        message: 'xunit Data should be associated to a Fact annotation.'
                        }
                    ]
                },
                {
                    code:  `
[Fact, Data]
function myFixtureToTest() {
}`,
                    errors: [
                        {
                        message: 'xunit Data should be a function with one parameter.'
                        }
                    ]
                },
                {
                    code:  `
[Fact, Data()]
function myFixtureToTest() {
}`,
                    errors: [
                        {
                        message: 'xunit Data should be a function with one parameter.'
                        }
                    ]
                },
                {
                    code:  `
[Fact, Data(myVar1, myVar2)]
function myFixtureToTest() {
}`,
                    errors: [
                        {
                        message: 'xunit Data should be a function with one parameter.'
                        }
                    ]
                }
            ]
        }
    );
});
