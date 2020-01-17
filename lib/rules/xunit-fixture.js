const {
  isNodeFunction
} = require('../node');

const {
  isArrayExpression,
  isAssignmentExpression,
  isFunctionExpression
} = require('../expression');

const XUNIT_ANNOTATION_FIXTURE_NAME = 'Fixture';

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

    return {
      ExpressionStatement(node) {
        const { expression } = node;

        if (isArrayExpression(expression)) {
          const { elements = null } = expression;
          const [ element ] = elements;

          if (element.name === XUNIT_ANNOTATION_FIXTURE_NAME) {
            const parentBody = node.parent.body;
            const index = parentBody.indexOf(node);

            if (index <= parentBody.length - 2) {
              const nextNode = parentBody[index + 1];
              const isFunction = isNodeFunction(nextNode);
              const valid = isFunction || isAssignmentExpression(nextNode.expression) && isFunctionExpression(nextNode.expression.right);

              if (!valid) {
                invalidFixture(node);
              } else if (isFunction) {
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
