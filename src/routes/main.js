const express = require("express");
const mainRouter = express.Router();
const productsRouter = require("./products");
const promosRouter = require("./promos");
const transactionsRouter = require("./transactions");
const usersRouter = require("./users");
const authRouter = require("./auth");
// const imgUpload = require("../middleware/upload");
const {
  memoryUpload,
  errorHandler,
} = require("../middleware/upload");
const cloudinaryUploader = require("../middleware/cloudinary");

const prefix = "/api/show";

mainRouter.use(`${prefix}/products`, productsRouter);
mainRouter.use(`${prefix}/promos`, promosRouter);
mainRouter.use(`${prefix}/transactions`, transactionsRouter);
mainRouter.use(`${prefix}/users`, usersRouter);
mainRouter.use(`${prefix}/auth`, authRouter);
mainRouter.use(`${prefix}/forgotpassword`, authRouter);
// mainRouter.post("/", diskUpload.single("image"), (req, res) => {
//   res.json({ url: `/images/${req.file.filename}` });
// });

// mainRouter.post(
//   "/",
//   (req, res, next) =>
//     diskUpload.single("image")(req, res, (err) => {
//       errorHandler(err, res, next);
//     }),
//   (req, res) => {
//     res.json({ url: `/images/${req.file.filename}` });
//   }
// );

mainRouter.post(
  "/cloud",
  (req, res, next) =>
    memoryUpload.single("image")(req, res, (err) => {
      errorHandler(err, res, next);
    }),
  cloudinaryUploader,
  (req, res) => {
    console.log(req.file);
    res.status(200).json({
      msg: "Upload Success",
      data: {
        url: req.file.url,
        secure: req.file.secure_url,
      },
    });
  }
);

mainRouter.get("/", (req, res) => {
  res.json({
    msg: "Welcome",
  });
});

module.exports = mainRouter;
