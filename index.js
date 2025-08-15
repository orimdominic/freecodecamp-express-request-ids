const express = require("express");
const { logRequestSummary, logger } = require("./logger");
const { setRequestId } = require("./set-request-id");

const app = express();

app.use(
  setRequestId(),
  express.json(),
  express.urlencoded({ extended: true }),
  logRequestSummary
);

app.get("/", function (req, res) {
  logger.info(`${req.method} request to ${req.url}`);
  return res.json({ method: req.method, url: req.url });
});

app.get("/hello", function (req, res) {
  logger.info(`${req.method} request to ${req.url}`);
  return res.json({ method: req.method, url: req.url });
});

app.listen(3333, (err) => {
  if (err) {
    return console.error(err);
  }

  console.log("Listening on port 3333");
});
