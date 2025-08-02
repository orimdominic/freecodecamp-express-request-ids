const { randomUUID } = require("node:crypto");
const { context } = require("./context");

/**
 * This should be your first middleware.
 *
 * It generates a unique ID and sets it on `req.headers.request_id`
 */
module.exports.setRequestId = function () {
  return function (req, res, next) {
    const headerKey = "request_id";
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
