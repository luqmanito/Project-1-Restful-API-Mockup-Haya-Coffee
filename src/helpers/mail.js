// const nodemailer = require("nodemailer");
require("dotenv").config();
const { EMAIL, PASSWORD, SECRETKEY } = process.env;
var CryptoJS = require("crypto-js");

// const transporter = nodemailer.createTransport({
//   service: "Zoho",
//   host: "smtp.zoho.com",
//   port: 465,
//   secure: true, //ssl
//   auth: {
//     user: EMAIL,
//     pass: PASSWORD,
//   },
// });

// const sendEmail = (emailReceiver, id) => {
// let _secretKey = SECRETKEY;
//   console.log("kirim email ngga");
//   console.log(emailReceiver);
//   console.log(id);
//   console.log(_secretKey);
//   console.log("dari env" + SECRETKEY);

// const encryptID = CryptoJS.AES.encrypt(`${id}`, `${_secretKey}`).toString();

// const slashNone = encryptID.replaceAll("/", "ito");
//   console.log(slashNone);
// let body2 = `http://localhost:3000/activation/${slashNone}`;
//   console.log(body2);
//   const options = {
//     from: `"Haya-Coffee-Shops" <${EMAIL}>`,
//     to: emailReceiver,
//     subject: "Email Activation:",
//     text: `This is link ${body2} to activate your account :`,
//   };
//   transporter.sendMail(options, function(err, info) {
//     if (err) console.log(err.message);
//     console.log(`Email Sent to: ${emailReceiver}`);
//   });
// };

const nodemailer = require("nodemailer");

module.exports = {
  mailSender: (emailReceiver, id) => {
    return new Promise((resolve, reject) => {

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
      let _secretKey = SECRETKEY;
      const encryptID = CryptoJS.AES.encrypt(
        `${id}`,
        `${_secretKey}`
      ).toString();
      const slashNone = encryptID.replaceAll("/", "ito");
      let body2 = `https://haya-coffee-frontend.vercel.app/activation/${slashNone}`;

      const mailOption = {
        from: `"Haya-Coffee-Shops" <${EMAIL}>`, // sender address
        to: emailReceiver, // list of receivers
        subject: "Email Activation:", // Subject line
        text: `This is link ${body2} to activate your account :`, // plain text body
        html: `
        <div
          class="container"
          style="max-width: 90%; margin: auto; padding-top: 20px"
        >
          <h2>Hi.</h2>
          <h4>This Is Your Email Verification</h4>
          <p style="margin-bottom: 30px;">Please click link below to activate the account</p>          
          <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;"> <a href="${body2}">Activation Link</a> </h1>
     </div>
      `,
      };

      transporter.sendMail(mailOption, (err, info) => {
        if (err) {
          console.log(err);
          return reject({ status: 500, msg: "Internal Server Error" });
        }
        return resolve({
          status: 200,
          msg: "Success, check email to verify",
        });
      });
    });
  },
};
