module.exports.isCallExpression = function isCallExpression(expression) {
  return !!(expression && expression.type === 'CallExpression');
};

module.exports.isArrayExpression = function isArrayExpression(expression) {
  return !!(expression && expression.type === 'ArrayExpression');
};

module.exports.isAssignmentExpression = function isAssignmentExpression(
  expression
) {
  return !!(expression && expression.type === 'AssignmentExpression');
};

module.exports.isCallExpression = function isCallExpression(expression) {
  return !!(expression && expression.type === 'CallExpression');
};

module.exports.isFunctionExpression = function isFunctionExpression(
  expression
) {
  return !!(expression && expression.type === 'FunctionExpression');
};

module.exports.isMemberExpression = function isMemberExpression(expression) {
  return !!(expression && expression.type === 'MemberExpression');
};
