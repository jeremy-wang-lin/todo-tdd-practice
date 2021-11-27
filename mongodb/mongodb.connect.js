const mongoose = require("mongoose");

const dbUrl =
  "mongodb+srv://jeremy:czj44WxD8Sbkf5mM@cluster0.nqbnx.mongodb.net/todo-tdd?retryWrites=true&w=majority";

async function connect() {
  try {
    await mongoose.connect(dbUrl);
  } catch (err) {
    console.error("Error connecting to mongodb");
    console.error(err);
  }
}

module.exports = { connect };
