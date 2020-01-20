const {
  getObjectName,
  getPropertyName
} = require('../node');

const {
  isMemberExpression
} = require('../expression');

const API_NAMES = [
  'Assert',
  'Mocks',
  'Object',
  'Records',
  'Stubs'
];

const METHOD_NAMES = {
  Assert: [
    // See http://xunitjs.shaege.com/#!assertions
    'AssignableFrom',
    'Contains',
    'DoesNotContain',
    'DoesNotThrow',
    'Empty',
    'Equal',
    'Fail',
    'False',
    'False',
    'NotEmpty',
    'NotEqual',
    'NotInRange',
    'NotNull',
    'NotSame',
    'NotType',
    'NotUndefined',
    'Null',
    'Same',
    'Throws',
    'True',
    'Type',
    'Undefined'
  ],
  Mocks: [
    'GetMock',
    'GetMocks',
    'Mock'
  ],
  Object: [
    'Global'
  ],
  Records: [
    'Exception'
  ],
  Stubs: [
    'CreateMethod',
    'CreateVoidMethod',
    'CreateObject',
    'CreateList',
    'CreateObject'
  ]
};

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Ensure that only knowned xunit methods of the API are called',
      category: 'Test',
      recommended: 'error',
    },
    messages: {
      invalidApi: '"{{apiName}}.{{methodName}}" is not a part of the xunit API.',
    },
    schema: [],
  },
  create(context) {
    function invalidApi(node, apiName, methodName) {
      context.report({
        node,
        messageId: 'invalidApi',
        data: { apiName, methodName }
      });
    }

    return {
      MemberExpression: function(node) {
        if (!isMemberExpression(node)) {
          return;
        }

        const apiName = getObjectName(node);

        if (!API_NAMES.includes(apiName)) {
          return;
        }

        const methodName = getPropertyName(node);

        if (METHOD_NAMES[apiName].includes(methodName)) {
          return;
        }

        invalidApi(node, apiName, methodName);
      }
    };
  }
};
