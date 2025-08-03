const { AsyncLocalStorage } = require("node:async_hooks");

let currentContext;

module.exports.context = function () {
  if (!currentContext) {
    currentContext = new AsyncLocalStorage();
  }

  return currentContext;
};
