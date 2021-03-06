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
            invalidDataFact: 'xunit Data should be associated to a Fact annotation.',
            invalidDataFunct: 'xunit Data should be a function with one parameter.',
            invalidDataParameterName: 'xunit Data should have parameter name called "{{expectedParameterName}}".',
            invalidDataFunctionParameters: 'when using xunit Data, you should then declare in your function a parameter to retrieve the data.',
            invalidDataFunctionParameterName: 'xunit Data recommends to use this parameter name: "{{expectedParameterName}}".'
        },
        schema: [
            {
                type: 'object',
                properties: {
                    suffix: {
                        type: 'string',
                        default: ''
                    },
                    dataParameterName: {
                        type: 'string',
                        default: ''
                    }
                }
            }
        ],
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

        function invalidDataParameterName(node, expectedParameterName) {
            context.report({
                node,
                messageId: 'invalidDataParameterName',
                data: { expectedParameterName }
            });
        }

        function invalidDataFunctionParameters(node) {
            context.report({
                node,
                messageId: 'invalidDataFunctionParameters',
                data: { }
            });
        }

        function invalidDataFunctionParameterName(node, expectedParameterName) {
            context.report({
                node,
                messageId: 'invalidDataFunctionParameterName',
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

                    if (dataAnnotation) {
                        if (!factAnnotation) {
                            invalidDataFact(dataAnnotation);
                            return;
                        }

                        if (!isCallExpression(dataAnnotation) || dataAnnotation.arguments.length !== 1) {
                            invalidDataFunct(dataAnnotation);
                            return;
                        }

                        const parentBody = node.parent.body;
                        const indexOfFunctionNode = parentBody.indexOf(node);
                        const nextFunctionNode = parentBody[indexOfFunctionNode + 1];

                        if (nextFunctionNode) {
                            const { suffix = '', dataParameterName = '' } = Object.assign({}, context.options[0]);
                            const indexOfDataAnnotation = elements.findIndex((element) => dataAnnotation === element);
                            const indexOfAsyncAnnotation = elements.findIndex((element) => element.name === ASYNC);

                            if (suffix) {
                                const functionName = nextFunctionNode.id.name;
                                const expectedParameterName = `${functionName}${suffix}`;

                                if (dataAnnotation.arguments[0].name !== expectedParameterName) {
                                    invalidDataParameterName(dataAnnotation, expectedParameterName);
                                }
                            }

                            const functionParameters = nextFunctionNode.params;

                            if (functionParameters.length <= 0 || indexOfAsyncAnnotation >= 0 && functionParameters.length < 2) {
                                invalidDataFunctionParameters(nextFunctionNode);
                            } else {
                                const argDataIndex = indexOfAsyncAnnotation >= 0 && indexOfAsyncAnnotation < indexOfDataAnnotation ? 1 : 0;

                                if (dataParameterName && functionParameters[argDataIndex].name !== dataParameterName) {
                                    invalidDataFunctionParameterName(functionParameters[argDataIndex], dataParameterName);
                                }
                            }
                        }
                    }
                }
            }
        };
    }
};
