const express = require("express");
const app = express();

app.use(express.json(), express.urlencoded({ extended: true }));

app.get("/", function (_, res) {
  return res.send("OK");
});

app.listen(3333, (err) => {
  if (err) {
    return console.error(err);
  }

  console.log("Listening on port 3333");
});
