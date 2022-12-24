const express = require("express");
const multer = require("multer");

const productsRouter = express.Router();
const { get, add, edit, drop, getById } = require("../controllers/products");

const isLogin = require("../middleware/isLogin");
const imgUpload = require("../middleware/upload");
const validate = require("../middleware/validate");
const isAllowed = require("../middleware/allowedRole");


function uploadFile(req, res, next) {
  const upload = imgUpload.single("imageUrl");
  upload(req, res, function (err) {
    if (err) {
      console.log("error found : ", err);
      if (err.code === "LIMIT_FILE_SIZE")
        return res.status(400).json({
          status: 400,
          msg: "File too large, image must be 2MB or lower",
          err: err.code,
        });
      if (err.code === "WRONG_EXSTENSION")
        return res.status(415).json({
          status: 415,
          msg: "Only .jpg, .jpeg and .png format allowed",
          error: err.code,
        });
      return res.status(500).json({
        msg: `Internal Server Errors`,
        err,
      });
    }
    next();
  });
}

productsRouter.get("/all", get);
productsRouter.post(
  "/add",
  isLogin.isLogins,
  isAllowed("user"),
  imgUpload.single("imageUrl"),
  add
);

productsRouter.patch(
  "/modify/",
  isLogin.isLogins,
  isAllowed("user"),
  uploadFile,
  edit
);


productsRouter.delete("/del/:id", drop);
productsRouter.get("/product_detail/", getById);

module.exports = productsRouter;
