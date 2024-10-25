import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendVerificationEmail = (email, token) => {
  return transporter.sendMail({
    to: email,
    subject: "Email Verification",
    text: `Please verify your email by clicking the link: ${process.env.BASE_URL}/api/auth?token=${token}`,
  });
};
