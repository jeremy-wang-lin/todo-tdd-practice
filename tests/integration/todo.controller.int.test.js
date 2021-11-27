const supertest = require("supertest");
const mongoose = require("mongoose");

const app = require("../../app");
const todoModel = require("../../models/todo.model");
const newTodo = require("../mock-data/new-todo.json");

const request = supertest(app);
const endpointUrl = "/todos/";

jest.setTimeout(15000);
beforeAll(async () => {
  const dbUrl =
    "mongodb+srv://jeremy:czj44WxD8Sbkf5mM@cluster0.nqbnx.mongodb.net/todo-tdd?retryWrites=true&w=majority";
  try {
    await mongoose.connect(dbUrl);
  } catch (err) {
    console.log(err);
  }
});

afterAll(async () => {
  mongoose.disconnect();
  await new Promise(resolve => setTimeout(() => resolve(), 10000)); // avoid jest open handle error
});

describe(endpointUrl, () => {

  afterEach(async () => {
    await todoModel.deleteMany();
  });
  it("POST" + endpointUrl, async () => {
    const response = await request.post(endpointUrl).send(newTodo);

    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe(newTodo.title);
    expect(response.body.done).toBe(newTodo.done);
  });
});
