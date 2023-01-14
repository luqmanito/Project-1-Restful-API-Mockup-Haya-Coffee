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
  console.log("kirim email ngga");
  console.log(emailReceiver);
  console.log(id);
  console.log(_secretKey);
  console.log("dari env" + SECRETKEY);

  const encryptID = CryptoJS.AES.encrypt(`${id}`, `${_secretKey}`).toString();

  const slashNone = encryptID.replace("/", "ito");
  console.log(slashNone);
  let body2 = `http://localhost:3000/activation/${slashNone}`;
  console.log(body2);
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
