const nodemailer = require('nodemailer');
const express = require('express');
const { send } = require('express/lib/response');
const app = express();

// Middleware
app.use(express.static('public'));
app.use(express.json());


app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname})   
});

app.post('/', (req, res) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false,
        auth: {
            user: 't8e8s8t8c8o8n8t8a8c8t8@outlook.com',
            pass: 'fdsdf3457fHJKFs'
        }
    });

    let mailOptions = {
        from: 't8e8s8t8c8o8n8t8a8c8t8@outlook.com',
        to: 'testcontact225@mailfence.com',
        subject: `You have a message from ${req.body.sender} - ${req.body.email}`,
        text: `${req.body.message}`
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if(err){
            console.log(err);
            res.send('error')
        }else{
            res.send('success');
        }
    });
});

app.listen(process.env.PORT || 80, () => {
    console.log('Server is running on port 5000');
});
