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
  filter
} = require("../controllers/products");

productsRouter.get("/all", get);

productsRouter.post("/add", add);

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

// const query = "insert into products (id, name, category, price, quantity) values ('p0007','Smoothies Berries', 'non coffee', 25000, 100), ('p0008','Milk Dates', 'non coffee', 22500, 150), ('p0009','Arabica Coffe', 'coffee', 15000, 200), ('p0010','Tenderloin Steak', 'food', 17000, 300)"
