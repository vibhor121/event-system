const { Router, query } = require("express");
const todoModel = require("../models/todoModel");
const userModel = require("../models/userModel");
const role = require("../middlewares/role");

const todoRouter = Router();

todoRouter.get("/", async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const skip = (page - 1) * limit;
  const sort = req.query.sort || 1;
  let query = {};

  if (req.query.title) {
    query.title = req.query.title;
  }

  const user = await userModel.findOne({ email: req.user.email });

  if (user.role == "admin") {
    const todos = await todoModel.find({}).populate("userId");
    return res.json({ todos: todos });
  }else{
    const todos = await todoModel.find({ userId: user._id }).populate("userId");
    return res.json({ todos: todos });
  }

  
});

todoRouter.post("/", async (req, res) => {
  const { title } = req.body;

  // const todos = await todoModel.find(query).skip(skip).limit(limit).sort({status:sort})

  // const userInfo = req.user;
  // console.log(userInfo);
  const user = await userModel.findOne({ email: req.user.email });
  // console.log(user)
  const todo = await todoModel.create({ title, userId: user._id });

  // res.send(todos);
  res.json({ message: "todos is created successfully" });
});

todoRouter.delete("/:id", role(["admin"]), async (req, res) => {
  const user = await todoModel.findByIdAndDelete(req.params.id);
  // console.log(user)
//   const todo = await todoModel.create({ title, userId: user._id });

  // res.send(todos);
  res.json({ message: "todos is deleted successfully" });
});


todoRouter.patch("/:id", role(["admin"]), async (req, res) => {
    const user = await todoModel.findByIdAndUpdate(req.params.id,req.body);
    // console.log(user)
  //   const todo = await todoModel.create({ title, userId: user._id });
  
    // res.send(todos);
    res.json({ message: "todos is updated successfully" });
  });
module.exports = todoRouter;
