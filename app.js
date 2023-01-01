const nodemailer = require("nodemailer");
const express = require("express");
const { send } = require("express/lib/response");
const app = express();
const path = require("path");
const { env } = require("process");
require("dotenv").config();

// Middleware
app.use(express.static("public"));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.sendFile("index.html", { root: path.join(__dirname, "/public")})   
});

app.post("/", (req, res) => {
    console.log(req.body);
    const transporter = nodemailer.createTransport({
        host: process.env.HOST,
        port: process.env.MAIL_PORT,
        secure: false,
        auth: {
            user: process.env.USER,
            pass: process.env.PASSWORD
        }
    });

    let mailOptions = {
        from: process.env.USER,
        to: "testcontact225@mailfence.com",
        subject: `You have a message from ${req.body.sender} - ${req.body.email}`,
        text: `${req.body.message}`
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if(err){
            console.log(err);
            res.send("error")
        }else{
            res.send("success");
        }
    });
});


app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running on port 3000");
});

