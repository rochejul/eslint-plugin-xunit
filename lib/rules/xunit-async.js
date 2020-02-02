const {
    isArrayExpression,
    isCallExpression
} = require('../expression');

const { ASYNC, DATA, FACT } = require('../annotations');

module.exports = {
    meta: {
        type: 'layout',
        docs: {
            description: 'Ensure that the xunit Data annotation is used well',
            category: 'Test',
            recommended: 'error',
        },
        messages: {
            invalidAsyncFact: 'xunit Async should be associated to a Fact annotation.',
            invalidAsyncFunctionParameters: 'when using xunit Async, you should then declare in your function a parameter to retrieve the callback function.',
            invalidAsyncFunctionParameterName: 'xunit Async recommends to use this parameter name: "{{expectedParameterName}}".'
        },
        schema: [
            {
                type: 'object',
                properties: {
                    callbackParameterName: {
                        type: 'string',
                        default: ''
                    }
                }
            }
        ],
    },
    create(context) {
        function invalidAsyncFact(node) {
            context.report({
                node,
                messageId: 'invalidAsyncFact',
                data: { }
            });
        }

        function invalidAsyncFunctionParameters(node) {
            context.report({
                node,
                messageId: 'invalidAsyncFunctionParameters',
                data: { }
            });
        }

        function invalidAsyncFunctionParameterName(node, expectedParameterName) {
            context.report({
                node,
                messageId: 'invalidAsyncFunctionParameterName',
                data: { expectedParameterName }
            });
        }

        return {
            ExpressionStatement(node) {
                const { expression } = node;

                if (isArrayExpression(expression)) {
                    const { elements = [] } = expression;
                    const dataAnnotation = elements.find((element) => element.name === DATA || isCallExpression(element)  && element.callee.name === DATA);
                    const factAnnotation = elements.find((element) => element.name === FACT);
                    const asyncAnnotation = elements.find((element) => element.name === ASYNC);

                    if (asyncAnnotation) {
                        if (!factAnnotation) {
                            invalidAsyncFact(asyncAnnotation);
                            return;
                        }

                        const parentBody = node.parent.body;
                        const indexOfFunctionNode = parentBody.indexOf(node);
                        const nextFunctionNode = parentBody[indexOfFunctionNode + 1];

                        if (nextFunctionNode) {
                            const { callbackParameterName = '' } = Object.assign({}, context.options[0]);
                            const indexOfDataAnnotation = elements.findIndex((element) => dataAnnotation === element);
                            const indexOfAsyncAnnotation = elements.findIndex((element) => asyncAnnotation === element);

                            const functionParameters = nextFunctionNode.params;

                            if (functionParameters.length <= 0 || indexOfDataAnnotation >= 0 && functionParameters.length < 2) {
                                invalidAsyncFunctionParameters(nextFunctionNode);
                            } else {
                                const argDataIndex = indexOfDataAnnotation >= 0 && indexOfDataAnnotation < indexOfAsyncAnnotation ? 1 : 0;

                                if (callbackParameterName && functionParameters[argDataIndex].name !== callbackParameterName) {
                                    invalidAsyncFunctionParameterName(functionParameters[argDataIndex], callbackParameterName);
                                }
                            }
                        }
                    }
                }
            }
        };
    }
};
