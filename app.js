const express = require("express");
const todoRoutes = require("./routes/todo.routes");

const app = express();

app.use("/todos", todoRoutes);

app.get("/", (req, res) => {
  res.json("Hello World!");
});

app.listen(3100, () => {
  console.log("Server is now running!");
});

module.exports = app;
