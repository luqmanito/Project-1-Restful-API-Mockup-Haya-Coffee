const express = require("express");
const isAllowed = require("../middleware/allowedRole");
const isLogin = require("../middleware/isLogin");
const transactionsRouter = express.Router();
const {
  get,
  add,
  edit,
  drop,
  search,
  sort,
  filter,
  create,
  getHistoryTransaction,
  dropTransactions,
  addCartItem,
  getCartUser
} = require("../controllers/transactions");
const { isLogins } = require("../middleware/isLogin");


transactionsRouter.get("/all", get);
transactionsRouter.post("/add", add);
transactionsRouter.patch("/modify/", edit);
// transactionsRouter.delete("/del/:order_id", drop);
transactionsRouter.get("/search", search);
transactionsRouter.get("/sort", sort);
transactionsRouter.get("/filter", filter);

transactionsRouter.post(
  "/create",
  isLogin.isLogins,
  create
  );

  transactionsRouter.post(
    "/addItem",
    isLogin.isLogins,
    addCartItem
    );

  transactionsRouter.get(
    "/history", 
    isLogin.isLogins,
    getHistoryTransaction
  );

  transactionsRouter.get(
    "/cartItems", 
    isLogin.isLogins,
    getCartUser
  );

  transactionsRouter.delete(
    "/delete_history/",
    isLogin.isLogins,
    dropTransactions
  );

module.exports = transactionsRouter;
