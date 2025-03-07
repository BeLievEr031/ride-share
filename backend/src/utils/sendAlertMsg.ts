// const nodemailer = require('nodemailer');
import nodemailer from "nodemailer"
import logger from "../config/logger"
import Config from "../config/Config";
// Create a transporter using Gmail's SMTP

const transporter = nodemailer.createTransport({
    service: 'gmail',  // Use Gmail as the email service
    auth: {
        user: 'believerdev031@gmail.com',    // Your Gmail address
        pass: Config.GMAIL_PASS_KEY!,     // Your Gmail password (or App Password if 2FA is enabled)
    },
});


const sendAlertMsg = async (email: string[], url: string) => {

    // Set up email data
    const mailOptions = {
        from: 'believerdev031@gmail.com', // sender address
        to: email, // list of receivers
        subject: 'Alert Notification.', // Subject line
        text: `Notification form friend see his/ger location ${url}`, // plain text body
        // html: '<b>This is a test email sent from Node.js using Nodemailer with Gmail!</b>', // optional HTML body
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            logger.error('Error occurred: ' + error.message);
            return;
        }
        logger.info('Email sent: ' + info.response);
    });
}


export default sendAlertMsg;