const {
  isNodeFunction,
  isNodeProgram
} = require('../node');

const {
  isArrayExpression
} = require('../expression');

const XUNIT_ANNOTATION_FACT_NAME = 'Fact';

module.exports = {
  meta: {
    type: 'layout',
    docs: {
      description: 'Ensure that the xunit Fact annotation is used well',
      category: 'Test',
      recommended: 'error',
    },
    messages: {
      invalidFact: 'xunit Fact should be associated to a function.',
      invalidGlobalFact: 'xunit Fact should be used on global scope.'
    },
    schema: [],
  },
  create(context) {
    function invalidFact(node) {
      context.report({
        node,
        messageId: 'invalidFact',
        data: { }
      });
    }

    function invalidGlobalFact(node) {
      context.report({
        node,
        messageId: 'invalidGlobalFact',
        data: { }
      });
    }

    return {
      ExpressionStatement(node) {
        const { expression } = node;

        if (isArrayExpression(expression)) {
          const { elements = null } = expression;
          const [ element ] = elements;

          if (element.name === XUNIT_ANNOTATION_FACT_NAME) {
            const parentBody = node.parent.body;
            const index = parentBody.indexOf(node);

            if (index <= parentBody.length - 2) {
              const nextNode = parentBody[index + 1];
              const isFact = isNodeFunction(nextNode);
              const isParent = isNodeProgram(nextNode.parent);
              const valid = isFact && !isParent;

              if (!valid) {
                if (isFact && isParent) {
                  invalidGlobalFact(node);
                } else {
                  invalidFact(node);
                }
              } else {
                context.markVariableAsUsed(nextNode.id.name);
              }
            } else {
              invalidFact(node);
            }
          }
        }
      }
    };
  }
};
