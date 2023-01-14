const { response, query } = require("express");
const sendEmail = require("../helpers/mail");
const { activateUsers } = require("../repo/users");
const usersRepo = require("../repo/users");

const nodemailer = require("nodemailer");
require("dotenv").config();
const { EMAIL, PASSWORD, SECRETKEY } = process.env;
var CryptoJS = require("crypto-js");

const transporter = nodemailer.createTransport({
  service: "Zoho",
  host: "smtp.zoho.com",
  port: 465,
  secure: true, //ssl
  auth: {
    user: EMAIL,
    pass: PASSWORD,
  },
});

const get = async (req, res) => {
  try {
    const response = await usersRepo.getUsers();
    res.status(200).json({
      result: response.rows,
    });
  } catch (err) {
    res.status(500).json({
      msg: "internal server error",
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const response = await usersRepo.getUsersId(req.query);
    res.status(200).json({
      result: response.rows,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "internal server error",
    });
  }
};

const add = async (req, res) => {
  const result = await usersRepo.addUsers(req.body);
  try {
    // let emailReceiver = req.body.email;
    // let id = result.rows[0].id;
    // console.log(emailReceiver, id);
    
    // let _secretKey = SECRETKEY;
    // console.log("kirim email ngga");
    // const encryptID = CryptoJS.AES.encrypt(`${id}`, `${_secretKey}`).toString();

    // const slashNone = encryptID.replace("/", "ito");

    // let body2 = `http://localhost:3000/activation/${slashNone}`;

    // const options = {
    //   from: `"Haya-Coffee-Shops" <${EMAIL}>`,
    //   to: emailReceiver,
    //   subject: "Email Activation:",
    //   text: `This is link ${body2} to activate your account :`,
    // };
    // transporter.sendMail(options, (err, info) => {
    //   if (err) console.log(err);
    //   console.log(`Email Sent to: ${emailReceiver}`);
    //   console.log(info);
    // });

    res.status(200).json({
      msg: `Register Succesfully`,
      data: req.body.email,
    });

    sendEmail(req.body.email, result.rows[0].id);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Email or phone already exist" });
  }
};

const activate = async (req, res) => {
  try {
    const result = await usersRepo.activateUsers(req.query);
    res.status(200).json({
      msg: ` Account activated`,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Activation Failed" });
  }
};

const edit = async (req, res) => {
  try {
    const response = await usersRepo.editUsers(req.body, req.query, req.file);
    res.status(200).json({
      msg: `Edit Succesfully`,
    });
  } catch (err) {
    res.status(500).json({ msg: "internal server error" });
  }
};

const drop = async (req, res) => {
  try {
    const result = await usersRepo.dropUsers(req.params);
    res.status(200).json({
      msg: `Delete Succesfully`,
    });
  } catch (err) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const search = async (req, res) => {
  try {
    const response = await usersRepo.searchUsers(req.query);
    res.status(200).json({
      result: response.rows,
    });
  } catch (err) {
    res.status(500).json({
      msg: "internal server error",
    });
  }
};

const sort = async (req, res) => {
  try {
    const response = await usersRepo.sortUsers();
    res.status(200).json({
      result: response.rows,
    });
  } catch (err) {
    res.status(500).json({
      msg: "internal server error",
    });
  }
};

const filter = async (req, res) => {
  try {
    const response = await usersRepo.filterUsers();
    res.status(200).json({
      result: response.rows,
    });
  } catch (err) {
    res.status(500).json({
      msg: "internal server error",
    });
  }
};

const editPass = (req, res) => {
  const { body } = req;
  usersRepo
    .editPassUsers(body)
    .then((response) => {
      res.status(200).json({
        msg: "Password has been updated",
        data: null,
      });
    })
    .catch((objErr) => {
      const statusCode = objErr.statusCode || 500;
      res.status(statusCode).json({ msg: objErr.err.message });
    });
};

const usersController = {
  get,
  add,
  edit,
  drop,
  search,
  sort,
  filter,
  editPass,
  getUserById,
  activate,
};

module.exports = usersController;
