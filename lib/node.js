module.exports.getObjectName = function getObjectName(callee) {
  if (callee && callee.object) {
    return callee.object.name;
  }

  return null;
};

module.exports.getPropertyName = function getPropertyName(callee) {
  if (callee && callee.property) {
    return callee.property.name;
  }

  return null;
};

module.exports.isNodeFunction = function isNodeFunction(node) {
  return !!(node && node.type === 'FunctionDeclaration');
};

module.exports.isNodeProgram = function isNodeProgram(node) {
  return !!(node && node.type === 'Program');
};
