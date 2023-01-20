const express = require("express");
const multer = require("multer");

const productsRouter = express.Router();
const { get, add, edit, drop, getById } = require("../controllers/products");

const isLogin = require("../middleware/isLogin");
// const imgUpload = require("../middleware/upload");
const {
  
  memoryUpload,
  errorHandler,
} = require("../middleware/upload");
const cloudinaryUploader = require("../middleware/cloudinary");
const validate = require("../middleware/validate");
const isAllowed = require("../middleware/allowedRole");


productsRouter.get("/all", get);
productsRouter.post(
  "/add",
  isLogin.isLogins,
  isAllowed("admin"),
  (req, res, next) =>
    memoryUpload.single("imageUrl")(req, res, (err) => {
      errorHandler(err, res, next)
    }),
  cloudinaryUploader,
  add
);

productsRouter.patch(
  "/modify/",
  isLogin.isLogins,
  isAllowed("admin"),
  memoryUpload.single("imageUrl"),
  // uploadFile,
  cloudinaryUploader,
  edit
);

productsRouter.delete("/del/:id", drop);
productsRouter.get("/product_detail/", getById);

module.exports = productsRouter;
