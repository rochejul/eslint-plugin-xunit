const {
    isArrayExpression,
    isCallExpression
} = require('../expression');

const { SKIP, FIXTURE, FACT } = require('../annotations');

module.exports = {
    meta: {
        type: 'layout',
        docs: {
            description: 'Ensure that the xunit Skip annotation is used well',
            category: 'Test',
            recommended: 'error',
        },
        messages: {
            invalidSkipFactOrFixture: 'xunit Trait should be associated to a Fact or Fixture annotation.',
            invalidSkipFunct: 'xunit Trait should be a function with zero or one parameter.',
        },
        schema: [
        ],
    },
    create(context) {
        function invalidSkipFactOrFixture(node) {
            context.report({
                node,
                messageId: 'invalidSkipFactOrFixture',
                data: { }
            });
        }

        function invalidSkipFunct(node) {
            context.report({
                node,
                messageId: 'invalidSkipFunct',
                data: { }
            });
        }

        return {
            ExpressionStatement(node) {
                const { expression } = node;

                if (isArrayExpression(expression)) {
                    const { elements = [] } = expression;
                    const skipAnnotation = elements.find((element) => element.name === SKIP || isCallExpression(element)  && element.callee.name === SKIP);
                    const factAnnotation = elements.find((element) => element.name === FACT);
                    const fixtureAnnotation = elements.find((element) => element.name === FIXTURE);

                    if (skipAnnotation) {
                        if (!factAnnotation && !fixtureAnnotation) {
                            invalidSkipFactOrFixture(skipAnnotation);
                            return;
                        }

                        if (isCallExpression(skipAnnotation) && skipAnnotation.arguments.length !== 1) {
                            invalidSkipFunct(skipAnnotation);
                            return;
                        }
                    }
                }
            }
        };
    }
};
