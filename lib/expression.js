module.exports.isArrayExpression = function isArrayExpression(expression) {
  return !!(expression.type === 'ArrayExpression');
};

module.exports.isAssignmentExpression = function isAssignmentExpression(expression) {
  return !!(expression && expression.type === 'AssignmentExpression');
};

module.exports.isFunctionExpression = function isFunctionExpression(expression) {
  return !!(expression && expression.type === 'FunctionExpression');
};
