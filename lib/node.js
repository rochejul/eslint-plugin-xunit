module.exports.deepObject = function deepObject(nodeOrObject) {
  if (nodeOrObject.object) {
    return deepObject(nodeOrObject.object);
  }

  return nodeOrObject;
}

module.exports.getObjectName = function getObjectName(node) {
  if (node && node.object) {
    return node.object.name;
  }

  return null;
};

module.exports.getPropertyName = function getPropertyName(node) {
  if (node && node.property) {
    return node.property.name;
  }

  return null;
};

module.exports.isNodeFunction = function isNodeFunction(node) {
  return !!(node && node.type === 'FunctionDeclaration');
};

module.exports.isNodeProgram = function isNodeProgram(node) {
  return !!(node && node.type === 'Program');
};
