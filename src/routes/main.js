const express = require("express");
const mainRouter = express.Router();
const productsRouter = require("./products");
const promosRouter = require("./promos");
const transactionsRouter = require("./transactions");
const usersRouter = require("./users");
const authRouter = require("./auth");
const imgUpload = require("../middleware/upload");

const prefix = "/api/show";

mainRouter.use(`${prefix}/products`, productsRouter); 
mainRouter.use(`${prefix}/promos`, promosRouter);
mainRouter.use(`${prefix}/transactions`, transactionsRouter);
mainRouter.use(`${prefix}/users`, usersRouter);
mainRouter.use(`${prefix}/auth`, authRouter);
mainRouter.use(`${prefix}/forgotpassword`, authRouter);
mainRouter.post("/", imgUpload.single("image"), (req, res) => {
  res.json({url: `/images/${req.file.filename}`})
});

mainRouter.get("/", (req, res) => {
  res.json({
    msg: "Welcome",
  });
});

module.exports = mainRouter;
