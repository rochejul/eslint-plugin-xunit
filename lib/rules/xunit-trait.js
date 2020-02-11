const {
  isArrayExpression,
  isCallExpression
} = require('../expression');

const { TRAIT, FIXTURE, FACT } = require('../annotations');

module.exports = {
  meta: {
      type: 'layout',
      docs: {
          description: 'Ensure that the xunit Trait annotation is used well',
          category: 'Test',
          recommended: 'error',
      },
      messages: {
          invalidTraitFactOrFixture: 'xunit Trait should be associated to a Fact or Fixture annotation.',
          invalidTraitFunct: 'xunit Trait should be a function with one parameter.',
      },
      schema: [
      ],
  },
  create(context) {
      function invalidTraitFactOrFixture(node) {
          context.report({
              node,
              messageId: 'invalidTraitFactOrFixture',
              data: { }
          });
      }

      function invalidTraitFunct(node) {
          context.report({
              node,
              messageId: 'invalidTraitFunct',
              data: { }
          });
      }

      return {
          ExpressionStatement(node) {
              const { expression } = node;

              if (isArrayExpression(expression)) {
                  const { elements = [] } = expression;
                  const traitAnnotation = elements.find((element) => element.name === TRAIT || isCallExpression(element)  && element.callee.name === TRAIT);
                  const factAnnotation = elements.find((element) => element.name === FACT);
                  const fixtureAnnotation = elements.find((element) => element.name === FIXTURE);

                  if (traitAnnotation) {
                      if (!factAnnotation && !fixtureAnnotation) {
                        invalidTraitFactOrFixture(traitAnnotation);
                          return;
                      }

                      if (!isCallExpression(traitAnnotation) || traitAnnotation.arguments.length !== 1) {
                        invalidTraitFunct(traitAnnotation);
                        return;
                      }
                  }
              }
          }
      };
  }
};
