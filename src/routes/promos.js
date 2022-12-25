const express = require("express");
const isAllowed = require("../middleware/allowedRole");
const cloudinaryUploader = require("../middleware/cloudinary");
const {diskUpload, memoryUpload} = require("../middleware/upload");
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
} = require("../controllers/promos");
const { isLogins } = require("../middleware/isLogin");

promosRouter.get("/all", get);
promosRouter.post(
  "/add",
  isLogin.isLogins,
  isAllowed("user"),
  memoryUpload.single("imageUrl"),
  cloudinaryUploader,
  add
  );
promosRouter.patch("/modify/", edit);
promosRouter.delete("/del/:id", drop);
promosRouter.get("/search", search);
promosRouter.get("/sort", sort);
promosRouter.get("/filter", filter);



module.exports = promosRouter;
