//ini berisikan main router

const express = require("express");

const mainRouter = express.Router();
//import subrouter
const productsRouter = require("./products");
const promosRouter = require("./promos");
const transactionsRouter = require("./transactions");
const usersRouter = require("./users");
const authRouter = require("./auth");
const imgUpload = require("../middleware/upload");

const prefix = "/api/show";

//sambungkan subrouter dg mainrouter
mainRouter.use(`${prefix}/products`, productsRouter); // u/ rute endpoint /products ditangani o/ productsrouter
mainRouter.use(`${prefix}/promos`, promosRouter);
mainRouter.use(`${prefix}/transactions`, transactionsRouter);
mainRouter.use(`${prefix}/users`, usersRouter);
mainRouter.use(`${prefix}/auth`, authRouter);
mainRouter.post("/", imgUpload.single("image"), (req, res) => {
  res.json({url: `/images/${req.file.filename}`})
});

mainRouter.get("/", (req, res) => {
  res.json({
    msg: "Welcome",
  });
});

module.exports = mainRouter;
