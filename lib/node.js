module.exports.isNodeFunction = function isNodeFunction(node) {
  return !!(node && node.type === 'FunctionDeclaration');
};
