const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()
const transporter = require('./utils/mailer/mail')
const app = express()


app.use(bodyParser.json())


app.post('/sendMultiMail', async (req, res) => {
    const {email} = req.body

    try {
        const mailOptions = {
            from: 'mocartofficial@gmail.com',
            to: email.join(","),
            subject: 'Sending Email using Node.js',
            text: 'Thats alright'
        }

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log('Error:', error);
            } else {
                console.log('Email sent: ' + info.response);
                res.json({success: true, message: "Email sent successfully"})
            }
        });
    } catch (error) {
        console.log({error})
        res.json({ success: false, message: "Something went wrong" })
    }
})

app.listen(4001, console.log("Server connected"))