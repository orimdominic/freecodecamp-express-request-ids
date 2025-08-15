const { randomUUID } = require("node:crypto");
const { contextStorage } = require("./context-storage");

/**
 * Preferably your first middleware.
 *
 * It generates a unique ID and stores it in AsyncLocalStorage for the request context.
 */
module.exports.setRequestId = function () {
  return function (_req, _res, next) {
    requestId = randomUUID();
    const store = contextStorage().getStore();

    if (!store) {
      return contextStorage().run({ requestId }, next);
    }

    if (store && !store.requestId) {
      store.requestId = requestId;
      return next();
    }

    return next();
  };
};
