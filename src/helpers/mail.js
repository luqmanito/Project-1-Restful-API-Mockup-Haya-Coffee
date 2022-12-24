const nodemailer = require ('nodemailer')
const dotenv = require("dotenv").config();
const emailENV = process.env.EMAIL
const passwordENV = process.env.PASSWORD
const email = 'separateways@zohomail.com'
const password = 'KAHL42DxaTep'


console.log(emailENV, passwordENV);

const transporter = nodemailer.createTransport({
    service:'Zoho',
    host: "smtp.zoho.com",
    port: 465,
    secure: true , //ssl
    auth: {
        user : email,
        pass : password,
    },
})

const sendEmail = (emailReceiver) => {
    const options = {
        from : `"Luqman Grahito" <${email}>`,
        to : emailReceiver,
        subject: "Email Activation:",
        text : "This is your activation email :"
    }
    transporter.sendMail(options, (err, info) =>{
        if(err) console.log(err)
        console.log(`Email Sent to: ${emailReceiver}`);
    })
}

sendEmail(`luqmangrahito@gmail.com`)

