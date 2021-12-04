const request = require("supertest");
const mongoose = require("mongoose");

const app = require("../../app");
const todoModel = require("../../models/todo.model");
const newTodo = require("../mock-data/new-todo.json");

const endpointUrl = "/todos/";

jest.setTimeout(10000);
//beforeAll(async () => {
//  const dbUrl =
//    "mongodb+srv://jeremy:czj44WxD8Sbkf5mM@cluster0.nqbnx.mongodb.net/todo-tdd?retryWrites=true&w=majority";
//  try {
//    await mongoose.connect(dbUrl);
//  } catch (err) {
//    console.log(err);
//  }
//});
//
afterAll(async () => {
  await todoModel.deleteMany();
  mongoose.disconnect();
  await new Promise((resolve) => setTimeout(() => resolve(), 2000)); // avoid jest open handle error
});

describe(endpointUrl, () => {
  test("POST" + endpointUrl, async () => {
    const response = await request(app).post(endpointUrl).send(newTodo);

    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe(newTodo.title);
    expect(response.body.done).toBe(newTodo.done);
  });

  it(
    "should return error 500 on malformed data with POST" + endpointUrl,
    async () => {
      const response = await request(app)
        .post(endpointUrl)
        .send({ title: "Missing done property" });

      expect(response.statusCode).toBe(500);
      expect(response.body).toStrictEqual({
        message: "Todo validation failed: done: Path `done` is required.",
      });
    }
  );

  test("GET" + endpointUrl, async () => {
    await request(app).post(endpointUrl).send(newTodo);
    const response = await request(app).get(endpointUrl);
    
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0].title).toBeDefined();
    expect(response.body[0].title).toBe(newTodo.title);
    expect(response.body[0].done).toBeDefined();
    expect(response.body[0].done).toBe(newTodo.done);

    firstTodo = response.body[0];
  });

  test("GET" + endpointUrl + ":todoId", async () => {
    const response = await request(app).get(endpointUrl + firstTodo._id);

    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe(firstTodo.title);
    expect(response.body.done).toBe(firstTodo.done);
  })
});
