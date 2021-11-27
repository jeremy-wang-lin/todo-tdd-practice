const TodoModel = require("../models/todo.model");

exports.createTodo = async (req, res, next) => {
  console.log("createTodo start")

  const createdModel = await TodoModel.create(req.body);
  console.log(createdModel);

  res.status(201).json(createdModel);
};
