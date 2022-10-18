const express = require("express");
const app = express();

const userRouter = require("./routers/userRouter");

const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(userRouter);

app.get("/", (req, res) => {
  res.send("welcome to test-task");
});

app.get("*", (req, res) => {
  res.send("route does not exits");
});

module.exports = app;
