module.exports = {
  meta: {
    type: 'layout',
    docs: {
      description:
        "The `jest` object is automatically in scope within every test file. The methods in the `jest` object help create mocks and let you control Jest's overall behavior. It is therefore completely unnecessary to import in `jest`, as Jest doesn't export anything in the first place.",
      category: 'Best Practices',
      recommended: 'error',
    },
    messages: {
      invalidFixture: `xunit Fixture should be associated to a function.`,
    },
    schema: [],
  },
  create(context) {
    return {
      ExpressionStatement(node) {
        const { expression } = node;
        const { type, elements = null } = expression;

        if (type === 'ArrayExpression') {
          const [ element ] = elements;

          if (element.name === 'Fixture') {
            const parentBody = node.parent.body;
            const index = parentBody.indexOf(node);

            if (index <= parentBody.length - 2) {
              const nextNode = parentBody[index + 1];

              if (nextNode.type !== 'FunctionDeclaration') {
                context.report({
                  node,
                  messageId: 'invalidFixture',
                  data: { }
                });
              } else {
                context.markVariableAsUsed(nextNode.id.name);
              }
            } else {
              context.report({
                node,
                messageId: 'invalidFixture',
                data: { }
              });
            }
          }
        }
      }
    };
  }
};
