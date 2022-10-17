const express = require("express");

const productsRouter = express.Router();
const {
  get,
  add,
  edit,
  drop,
  search,
  sortSold,
  sortNewest,
  sortPrice,
  filter,
} = require("../controllers/products");
const isLogin = require("../middleware/isLogin");
const upload = require("../middleware/upload");
const validate = require("../middleware/validate");

productsRouter.get("/all", get);

productsRouter.post(
  "/add",
  isLogin(),
  upload.single("image"),
  validate.body(...allowed.body),
  add
);
// validate("name", "category", "price", "quantity", "sold"),

// butuh id
// /api/show/products{id}
// params => req.params.namavariabel (diakses via params)
productsRouter.patch("/modify/:id", edit);

productsRouter.delete("/del/:id", drop);

productsRouter.get("/search", search);
productsRouter.get("/sortsold", sortSold);
productsRouter.get("/sortprice", sortPrice);
productsRouter.get("/sortnewest", sortNewest);
productsRouter.get("/filter", filter);

module.exports = productsRouter;

//   res.json({body: {
//     id,
//     name,
//     category,
//     price,
//     quantity
// }})


