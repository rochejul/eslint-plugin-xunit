const cloneDeep = require('clone-deep');

const {
  getObjectName,
  getPropertyName
} = require('../node');

const {
  isMemberExpression
} = require('../expression');

const API_NAMES = [
  'Assert',
  'Function',
  'Mocks',
  'Object',
  'Record',
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
  Function: ['RegisterNamespace'],
  Mocks: ['GetMock', 'GetMocks', 'Mock'],
  Object: ['Global'],
  Record: ['Exception'],
  Stubs: [
    'CreateMethod',
    'CreateVoidMethod',
    'CreateObject',
    'CreateList',
    'CreateObject',
    'GetMethod',
    'GetObject'
  ]
};

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Ensure that only known xunit methods of the API are called',
      category: 'Test',
      recommended: 'error'
    },
    messages: {
      invalidApi: '"{{apiName}}.{{methodName}}" is not a part of the xunit API.'
    },
    schema: [
      {
        type: 'object',
        properties: {
          extendedApi: {
            type: 'object',
            default: {}
          }
        }
      }
    ]
  },
  create(context) {
    const { extendedApi = {} } = Object.assign({}, context.options[0]);
    const extendedApiNames = Object.keys(extendedApi);
    let apiNames = cloneDeep(API_NAMES);
    let methodNames = cloneDeep(METHOD_NAMES);

    if (extendedApiNames.length > 0) {
      apiNames = [...new Set(apiNames.concat(extendedApiNames))];

      extendedApiNames.forEach((extendedApiName) => {
        if (!methodNames[extendedApiName]) {
          methodNames[extendedApiName] = [];
        }

        methodNames[extendedApiName] = [...new Set(methodNames[extendedApiName].concat(extendedApi[extendedApiName]))]
      });
    }

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

        if (!apiNames.includes(apiName)) {
          return;
        }

        const methodName = getPropertyName(node);

        if (methodNames[apiName].includes(methodName)) {
          return;
        }

        invalidApi(node, apiName, methodName);
      }
    };
  }
};
