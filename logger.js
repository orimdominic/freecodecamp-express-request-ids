const winston = require("winston");
const morgan = require("morgan");

const { combine, errors, json, timestamp, colorize } = winston.format;

const logHandler = winston.createLogger({
  level: "debug",
  levels: winston.config.npm.levels,
  format: combine(
    timestamp({ format: "YYYY-MM-DD hh:mm:ss.SSS A" }),
    errors({ stack: true }),
    json({ space: 2 }),
    colorize({
      all: true,
      colors: {
        info: "gray",
        error: "red",
        http: "blue",
      },
    })
  ),
  transports: [new winston.transports.Console()],
});

exports.logger = {
  info: function (log) {
    logHandler.child({}).info(log);
  },

  error: function (log) {
    logHandler.child({}).error(log);
  },
};

exports.logRequestSummary = morgan(
  // https://github.com/expressjs/morgan?tab=readme-ov-file#using-a-custom-format-function
  function (tokens, req, res) {
    return JSON.stringify({
      url: tokens.url(req, res),
      method: tokens.method(req, res),
      status_code: Number(tokens.status(req, res) || "500"),
      content_length: tokens.res(req, res, "content-length") + " bytes",
      response_time: Number(tokens["response-time"](req, res) || "0") + " ms",
    });
  },
  {
    stream: {
      // Configure Morgan to use our custom logger with the http severity
      write: (message) => {
        const httpLog = JSON.parse(message);
        logHandler.http(httpLog);
      },
    },
  }
);
