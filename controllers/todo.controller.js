const TodoModel = require("../models/todo.model");

exports.createTodo = async (req, res, next) => {
  //console.log("createTodo start");

  try {
    const createdModel = await TodoModel.create(req.body);
    //console.log(createdModel);
    res.status(201).json(createdModel);
  } catch (err) {
    //console.error(err);
    return next(err);
  }
};

exports.getTodos = async (req, res, next) => {
  try {
    const todos = await TodoModel.find();
    res.status(200).json(todos);
  } catch (err) {
    return next(err);
  }
};

exports.getTodoById = async (req, res, next) => {
  try {
    const existingTodo = await TodoModel.findById(req.params.todoId);
    res.status(200).json(existingTodo);
  } catch (err) {
    return next(err);
  }
};
