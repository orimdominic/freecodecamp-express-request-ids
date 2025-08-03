const { randomUUID } = require("node:crypto");
const { context } = require("./context");

/**
 * This should be your first middleware.
 *
 * It generates a unique ID and sets it on `req.headers["X-Request-ID"]`. It also
 * stores the unique ID in async context local storage.
 */
module.exports.setRequestId = function () {
  return function (req, res, next) {
    const headerKey = "X-Request-ID";
    let requestId = req.headers[headerKey];

    if (!requestId) {
      requestId = randomUUID();
      req.headers[headerKey] = requestId;
    }

    res.setHeader(headerKey, requestId);
    const currentContext = context().getStore();

    if (currentContext) {
      currentContext.requestId = requestId;
      return next();
    }

    context().run({ requestId }, next);
  };
};
