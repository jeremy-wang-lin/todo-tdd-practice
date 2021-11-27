const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.json("Hello World!");
});

app.listen(3100, () => {
  console.log("Server is now running!");
});

module.exports = app;
