const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config();
const emailENV = process.env.EMAIL;
const passwordENV = process.env.PASSWORD;
const email = "separateways@zohomail.com";
const password = "KAHL42DxaTep";
var SimpleCrypto = require("simple-crypto-js").default;
var CryptoJS = require("crypto-js");

console.log(emailENV, passwordENV);

const transporter = nodemailer.createTransport({
  service: "Zoho",
  host: "smtp.zoho.com",
  port: 465,
  secure: true, //ssl
  auth: {
    user: email,
    pass: password,
  },
});

const sendEmail = (emailReceiver, id) => {

  let _secretKey = "bolgeo";

  const encryptID = CryptoJS.AES.encrypt(`${id}`, `${_secretKey}`).toString();
//   let bytes  = CryptoJS.AES.decrypt(encryptID, `${_secretKey}`);
//   let originalText = bytes.toString(CryptoJS.enc.Utf8);


const slashNone = encryptID.replace("/", 'ito');
console.log(encryptID);



  let body2 = `http://localhost:3000/activation/${slashNone}`;

  const options = {
    from: `"Luqman Grahito" <${email}>`,
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
