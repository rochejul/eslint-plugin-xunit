describe('xunit/api - ', () => {
  const { RuleTester } = require('eslint');

  const rule = require('../../lib/rules/xunit-api')

  RuleTester.describe = function describe(text, method) {
    RuleTester.it.title = text;
    return method.call(this);
  };

  RuleTester.it = function it(text, method) {
    test(`${RuleTester.it.title}: ${text}`, method);
  };

  const ruleTester = new RuleTester();
  ruleTester.run(
    'xunit/api',
    rule,
    {
      valid: [
        {
          code: 'assert.equal'
        },
        {
          code: 'Assert.Equal'
        },
        {
          code: 'Assert.Equal("a", 5)'
        },
        {
          code: 'MyApi.Assert.equal'
        }
      ],
      invalid: [
        {
          code:  'Assert.equal',
          errors: [
            {
              message: '"Assert.equal" is not a part of the xunit API.'
            }
          ]
        },
        {
          code:  'Assert.equal("a", 5)',
          errors: [
            {
              message: '"Assert.equal" is not a part of the xunit API.'
            }
          ]
        }
      ]
    }
  );
});
