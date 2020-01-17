const { RuleTester } = require('eslint');

module.exports = async () => {
  RuleTester.describe = function describe(text, method) {
    RuleTester.it.title = text;
    return method.call(this);
  };

  RuleTester.it = function it(text, method) {
    test(`${RuleTester.it.title}: ${text}`, method);
  };
};
