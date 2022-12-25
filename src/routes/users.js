const express = require("express");
const isLogin = require("../middleware/isLogin");
const imgUpload = require("../middleware/upload");
const cloudinaryUploader = require("../middleware/cloudinary");
const {memoryUpload} = require("../middleware/upload");
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

const usersRouter = express.Router();
const {
  get,
  add,
  edit,
  drop,
  search,
  sort,
  filter,
  editPass,
  getUserById,
} = require("../controllers/users");
const { isLogins } = require("../middleware/isLogin");

usersRouter.get("/all", get);
usersRouter.get("/profile/", getUserById);
usersRouter.post("/add", add);

usersRouter.patch(
  "/modify/", 
  isLogin.isLogins, 
  memoryUpload.single("imageUrl"),
  cloudinaryUploader,
  edit
  );
usersRouter.delete("/del/:id", drop);
usersRouter.get("/search", search);
usersRouter.get("/sort", sort);
usersRouter.get("/filter", filter);
usersRouter.patch("/edit_pass", editPass);

module.exports = usersRouter;
