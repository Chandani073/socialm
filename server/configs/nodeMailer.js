import nodemailer from "nodemailer";

// Create SMTP transporter (Brevo)
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587, // ✔ Correct SMTP port for Brevo
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendEmail = async (to, subject, body) => {
  try {
    const response = await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: to,
      subject: subject,
      html: body, // ✔ HTML body
    });

    return response;
  } catch (error) {
    console.error("Email sending failed:", error);
    throw error;
  }
};

export default sendEmail;

