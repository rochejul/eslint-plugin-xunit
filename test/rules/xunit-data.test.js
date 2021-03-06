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
function myFixtureToTest(data) {
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
[Fact, Data(myFixtureToTestData)]
function myFixtureToTest(data) {
}`,
                    options: [
                        {
                            suffix: 'Data'
                        }
                    ]
                },
                {
                    code:`
[Fact, Data(myVar)]
function myFixtureToTest(data) {
}`,
                    options: [
                        {
                            dataParameterName: 'data'
                        }
                    ]
                },
                {
                    code:`
[Fact, Async, Data(myVar)]
function myFixtureToTest(callback, data) {
}`,
                    options: [
                        {
                            dataParameterName: 'data'
                        }
                    ]
                }
            ],
            invalid: [
                {
                    code:  `
[Data(myVar)]
function myFixtureToTest(data) {
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
function myFixtureToTest(data) {
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
function myFixtureToTest(data) {
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
function myFixtureToTest(data) {
}`,
                    errors: [
                        {
                            message: 'xunit Data should be a function with one parameter.'
                        }
                    ]
                },
                {
                    code:`
[Fact, Data(myVar)]
function myFixtureToTest(data) {
}`,
                    options: [
                        {
                            suffix: 'Data'
                        }
                    ],
                    errors: [
                        {
                            message: 'xunit Data should have parameter name called "myFixtureToTestData".'
                        }
                    ]
                },
                {
                    code:  `
[Fact, Data(myVar)]
function myFixtureToTest() {
}`,
                    errors: [
                        {
                            message: 'when using xunit Data, you should then declare in your function a parameter to retrieve the data.'
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
                            message: 'when using xunit Data, you should then declare in your function a parameter to retrieve the data.'
                        }
                    ]
                },
                {
                    code:  `
[Fact, Async, Data(myVar)]
function myFixtureToTest(callback) {
}`,
                    errors: [
                        {
                            message: 'when using xunit Data, you should then declare in your function a parameter to retrieve the data.'
                        }
                    ]
                },
                {
                    code:  `
[Fact, Data(myVar)]
function myFixtureToTest(myData) {
}`,
                    options: [
                        {
                            dataParameterName: 'data'
                        }
                    ],
                    errors: [
                        {
                            message: 'xunit Data recommends to use this parameter name: "data".'
                        }
                    ]
                },
                {
                    code:  `
[Fact, Async, Data(myVar)]
function myFixtureToTest(callback, myData) {
}`,
                    options: [
                        {
                            dataParameterName: 'data'
                        }
                    ],
                    errors: [
                        {
                            message: 'xunit Data recommends to use this parameter name: "data".'
                        }
                    ]
                }
            ]
        }
    );
});
