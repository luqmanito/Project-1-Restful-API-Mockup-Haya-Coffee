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

// async..await is not allowed in global scope, must use a wrapper
// async function main(emailReceiver, id) {
//   let _secretKey = SECRETKEY;
//   const encryptID = CryptoJS.AES.encrypt(`${id}`, `${_secretKey}`).toString();
//   const slashNone = encryptID.replaceAll("/", "ito");
//   let body2 = `http://localhost:3000/activation/${slashNone}`;
//   // Generate test SMTP service account from ethereal.email
//   // Only needed if you don't have a real mail account for testing
//   // let testAccount = await nodemailer.createTestAccount();
// console.log('dari cont',emailReceiver, id);
//   // create reusable transporter object using the default SMTP transport
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

//   // send mail with defined transport object
//   let info = await transporter.sendMail({
//     from: `"Haya-Coffee-Shops" <${EMAIL}>`, // sender address
//     to: emailReceiver, // list of receivers
//     subject: "Email Activation:", // Subject line
//     text: `This is link ${body2} to activate your account :`, // plain text body
//     // html: "<b>Hello New User?</b>", // html body
//   });

//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//   // Preview only available when sending through an Ethereal account
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// }

// // main().catch(console.error);

// // sendEmail(`luqmangrahito@gmail.com`)

// module.exports = main;

module.exports = {
  mailSender: (emailReceiver, id) => {
    return new Promise((resolve, reject) => {
      // const accessToken = OAuth2Client.getAccessToken;

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
      let body2 = `http://localhost:3000/activation/${slashNone}`;

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
          <h4>This Is Your Code Verification</h4>
          <p style="margin-bottom: 30px;">Please click link to activate the account</p>          
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
