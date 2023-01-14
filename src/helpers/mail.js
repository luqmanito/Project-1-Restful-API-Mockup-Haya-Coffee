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

const sendEmail = (emailReceiver, id) => {
  let _secretKey = SECRETKEY;

  const encryptID = CryptoJS.AES.encrypt(`${id}`, `${_secretKey}`).toString();

  const slashNone = encryptID.replace("/", "ito");

  let body2 = `http://localhost:3000/activation/${slashNone}`;

  const options = {
    from: `"Haya-Coffee-Shops" <${EMAIL}>`,
    to: emailReceiver,
    subject: "Email Activation:",
    text: `This is link ${body2} to activate your account :`,
  };
  transporter.sendMail(options, (err, info) => {
    if (err) console.log(err);
    console.log(`Email Sent to: ${emailReceiver}`);
  });
};

// sendEmail(`luqmangrahito@gmail.com`)

module.exports = sendEmail;
