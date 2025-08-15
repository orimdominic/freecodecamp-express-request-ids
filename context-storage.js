const { AsyncLocalStorage } = require("node:async_hooks");

let store;

module.exports.contextStorage = function () {
  if (!store) {
    store = new AsyncLocalStorage();
  }

  return store;
};
