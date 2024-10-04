// Load environment variables
require("dotenv").config();

const nodemailer = require("nodemailer");

// Function to send confirmation email
const sendConfirmationEmail = async (userEmail, userName) => {
  try {
    // Create a Nodemailer transporter using Gmail or any other SMTP server
    let transporter = nodemailer.createTransport({
      service: "gmail", // Use 'smtp' for other SMTP services
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS, // Your App Password
      },
    });

    // Define the email options
    const mailOptions = {
      from: `"Your Cullen Bay FIshing Charters" <${process.env.EMAIL_USER}>`, // Sender address
      to: userEmail, // Recipient's email address
      subject: "Booking Confirmation", // Subject line
      html: `
        <h2>Booking Confirmation</h2>
        <p>Dear ${userName},</p>
        <p>Thank you for your booking! We have received your booking and are excited to host you.</p>
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

// Example usage: Sending an email to the user
// sendConfirmationEmail("user@example.com", "John Doe");
module.exports = sendConfirmationEmail;