const {
  deepObject,
  isNodeFunction,
  isNodeProgram
} = require('../node');

const {
  isArrayExpression,
  isAssignmentExpression,
  isFunctionExpression
} = require('../expression');

const { FIXTURE } = require('../annotations');

module.exports = {
  meta: {
    type: 'layout',
    docs: {
      description: 'Ensure that the xunit Fixture annotation is used well',
      category: 'Test',
      recommended: 'error',
    },
    messages: {
      invalidFixture: 'xunit Fixture should be associated to a function.',
      invalidGlobalFixture: 'xunit Global Fixture should be declared on global scope.',
      invalidGlobalFixtureTest: 'xunit Global Fixture should be associated to the Test object.'
    },
    schema: [],
  },
  create(context) {
    function invalidFixture(node) {
      context.report({
        node,
        messageId: 'invalidFixture',
        data: { }
      });
    }

    function invalidGlobalFixture(node) {
      context.report({
        node,
        messageId: 'invalidGlobalFixture',
        data: { }
      });
    }

    function invalidGlobalFixtureTest(node) {
      context.report({
        node,
        messageId: 'invalidGlobalFixtureTest',
        data: { }
      });
    }

    return {
      ExpressionStatement(node) {
        const { expression } = node;

        if (isArrayExpression(expression)) {
          const { elements = null } = expression;
          const [ element ] = elements;

          if (element.name === FIXTURE) {
            const parentBody = node.parent.body;
            const index = parentBody.indexOf(node);

            if (index <= parentBody.length - 2) {
              const nextNode = parentBody[index + 1];
              const isFixture = isNodeFunction(nextNode);
              const isAssignmentFixture = isAssignmentExpression(nextNode.expression) && isFunctionExpression(nextNode.expression.right);
              const isTestAssignment = isAssignmentFixture ? deepObject(nextNode.expression.left).name === 'Test' : false;
              const isGlobalFixture = isAssignmentFixture && isNodeProgram(nextNode.parent) && isTestAssignment;
              const valid = isFixture || isGlobalFixture;

              if (!valid) {
                if (isAssignmentFixture) {
                  if (!isTestAssignment) {
                    invalidGlobalFixtureTest(node);
                  } else {
                    invalidGlobalFixture(node);
                  }
                } else {
                  invalidFixture(node);
                }
              } else if (isFixture) {
                context.markVariableAsUsed(nextNode.id.name);
              }
            } else {
              invalidFixture(node);
            }
          }
        }
      }
    };
  }
};
