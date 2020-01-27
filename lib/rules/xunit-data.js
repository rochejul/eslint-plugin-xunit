const {
    isArrayExpression,
    isCallExpression
} = require('../expression');

const { DATA, FACT } = require('../annotations');

module.exports = {
    meta: {
        type: 'layout',
        docs: {
            description: 'Ensure that the xunit Data annotation is used well',
            category: 'Test',
            recommended: 'error',
        },
        messages: {
            invalidDataFact: 'xunit Data should be associated to a Fact annotation.',
            invalidDataFunct: 'xunit Data should be a function with one parameter.'
        },
        schema: [],
    },
    create(context) {
        function invalidDataFact(node) {
            context.report({
                node,
                messageId: 'invalidDataFact',
                data: { }
            });
        }

        function invalidDataFunct(node) {
            context.report({
                node,
                messageId: 'invalidDataFunct',
                data: { }
            });
        }

        return {
            ExpressionStatement(node) {
                const { expression } = node;

                if (isArrayExpression(expression)) {
                    const { elements = [] } = expression;
                    const dataAnnotation = elements.find((element) => element.name === DATA || isCallExpression(element)  && element.callee.name === DATA);
                    const factAnnotation = elements.find((element) => element.name === FACT);

                    if (dataAnnotation) {
                        if (!factAnnotation) {
                            invalidDataFact(dataAnnotation);
                            return;
                        }

                        if (!isCallExpression(dataAnnotation) || dataAnnotation.arguments.length !== 1) {
                            invalidDataFunct(dataAnnotation);
                            return;
                        }
                    }
                }
            }
        };
    }
};
