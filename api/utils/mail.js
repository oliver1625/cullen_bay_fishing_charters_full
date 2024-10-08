require("dotenv").config();

const nodemailer = require("nodemailer");

const sendConfirmationEmail = async (email, userName) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail", 
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });
    console.log(email,userName, "userEmail");
    const mailOptions = {
      from: `"Your Cullen Bay FIshing Charters" <${process.env.EMAIL_USER}>`, // Sender address
      to: email, 
      subject: "Booking Confirmation", 
      html: `
        <h2>Booking Confirmation</h2>
        <p>Dear ${userName},</p>
        <p>Thank you for your Payment! We have received your payment and are excited to host you.</p>
        <p>Best regards,<br/>Cullen Bay fishing charter</p>
      `,
    };

    // Send the email
    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendConfirmationEmail;
