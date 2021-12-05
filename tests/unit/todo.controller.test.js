const httpMocks = require("node-mocks-http");

const TodoController = require("../../controllers/todo.controller");
const TodoModel = require("../../models/todo.model");

const newTodo = require("../mock-data/new-todo.json");
const allTodos = require("../mock-data/all-todos.json");
const existingTodo = require("../mock-data/existing-todo.json");

TodoModel.create = jest.fn();
TodoModel.find = jest.fn();
TodoModel.findById = jest.fn();

let req, res, next;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe("TodoController.createTodo", () => {
  beforeEach(() => {
    req.body = newTodo;
  });

  it("should have a creteTodo function", () => {
    expect(typeof TodoController.createTodo).toBe("function");
  });

  it("should call TodoModel.create", async () => {
    await TodoController.createTodo(req, res, next);

    expect(TodoModel.create).toBeCalledWith(newTodo);
  });

  it("should return 201 response code", async () => {
    await TodoController.createTodo(req, res, next);

    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it("should return json body in response", async () => {
    TodoModel.create.mockReturnValue(newTodo);

    await TodoController.createTodo(req, res, next);

    expect(res._getJSONData()).toStrictEqual(newTodo);
  });

  it("should handle errors", async () => {
    const errorMessage = { message: "Done property missing" };
    const rejectedPromise = Promise.reject(errorMessage);
    TodoModel.create.mockReturnValue(rejectedPromise);

    await TodoController.createTodo(req, res, next);

    expect(next).toBeCalledWith(errorMessage);
  });
});

describe("TodoController.getTodos", () => {
  it("should have a getTodos function", () => {
    expect(typeof TodoController.getTodos).toBe("function");
  });

  it("should call TodoModel.find", async () => {
    await TodoController.getTodos(req, res, next);

    expect(TodoModel.find).toBeCalled();
  });

  it("should return 200 response code", async () => {
    await TodoController.getTodos(req, res, next);

    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it("should return all todos in json body in response", async () => {
    TodoModel.find.mockReturnValue(allTodos);

    await TodoController.getTodos(req, res, next);

    expect(res._getJSONData()).toStrictEqual(allTodos);
  });

  it("should handle error", async () => {
    const error = { message: "error when finding todos" };
    const rejectedPromise = Promise.reject(error);
    TodoModel.find.mockReturnValue(rejectedPromise);

    await TodoController.getTodos(req, res, next);

    expect(next).toBeCalledWith(error);
  });
});

describe("TodoController.getTodoById", () => {
  it("should have a getTodoById function", () => {
    expect(typeof TodoController.getTodoById).toBe("function");
  });

  it("should call TodoModel.findById", async () => {
    req.params.todoId = "61aa0d078fae12241e4b9646";

    await TodoController.getTodoById(req, res, next);

    expect(TodoModel.findById).toBeCalledWith("61aa0d078fae12241e4b9646");
  });

  it("should return json body and response code 200", async () => {
    TodoModel.findById.mockReturnValue(existingTodo);

    await TodoController.getTodoById(req, res, next);

    expect(res._getJSONData()).toStrictEqual(existingTodo);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it("should handle error", async () => {
    const error = { message: "error when finding todo by ID" };
    const rejectedPromise = Promise.reject(error);
    TodoModel.findById.mockReturnValue(rejectedPromise);

    await TodoController.getTodoById(req, res, next);

    expect(next).toBeCalledWith(error);
  });

  it("should return 404 when item does not exist", async () => {
    TodoModel.findById.mockReturnValue(null);

    await TodoController.getTodoById(req, res, next);

    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
  });
});

describe("TodoController.updateTodo", () => {
  it("should have a updateTodo function", () => {
    expect(typeof TodoController.updateTodo).toBe("function");
  });
});
