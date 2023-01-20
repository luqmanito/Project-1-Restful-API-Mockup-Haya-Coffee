const express = require("express");
const isAllowed = require("../middleware/allowedRole");
const cloudinaryUploader = require("../middleware/cloudinary");
const { memoryUpload} = require("../middleware/upload");
const isLogin = require("../middleware/isLogin");
const promosRouter = express.Router();
const {
  get,
  add,
  edit,
  drop,
  search,
  sort,
  filter,
  mainCost,
} = require("../controllers/promos");
const { isLogins } = require("../middleware/isLogin");

promosRouter.get("/all", get);
promosRouter.post(
  "/add",
  isLogin.isLogins,
  isAllowed("admin"),
  memoryUpload.single("imageUrl"),
  cloudinaryUploader,
  add
  );
promosRouter.patch("/modify/", edit);
promosRouter.delete("/del/:id", drop);
promosRouter.get("/search", search);
promosRouter.get("/sort", sort);
promosRouter.get("/filter", filter);
promosRouter.get("/cost", mainCost);



module.exports = promosRouter;
