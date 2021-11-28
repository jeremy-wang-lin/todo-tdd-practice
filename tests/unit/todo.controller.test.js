const httpMocks = require("node-mocks-http");

const TodoController = require("../../controllers/todo.controller");
const TodoModel = require("../../models/todo.model");

const newTodo = require("../mock-data/new-todo.json");
const allTodos = require("../mock-data/all-todos.json");

TodoModel.create = jest.fn();
TodoModel.find = jest.fn();

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
