const express = require("express");

const usersRouter = express.Router();
const {
  get,
  add,
  edit,
  drop,
  search,
  sort,
  filter,
  editPass,
} = require("../controllers/users");

usersRouter.get("/all", get);
usersRouter.post("/add", add);
usersRouter.patch("/modify/:id", edit);
usersRouter.delete("/del/:id", drop);
usersRouter.get("/search", search);
usersRouter.get("/sort", sort);
usersRouter.get("/filter", filter);
usersRouter.patch("/edit_pass", editPass);


module.exports = usersRouter;
