describe('xunit/api - ', () => {
  const { RuleTester } = require('eslint');

  const rule = require('../../lib/rules/xunit-api');

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
