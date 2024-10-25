import { User } from "../../models/User";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      return await handlePost(req, res);
    case "GET":
      return await verifyEmail(req, res);
    default:
      res.setHeader("Allow", ["POST", "GET"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function handlePost(req, res) {
  const { email, password } = req.body;

  const existingUser = await User.findByEmail(email);
  if (existingUser) {
    return res.status(400).json({ error: "Email already in use" });
  }

  const verificationToken = await User.create(email, password);

  await transporter.sendMail({
    to: email,
    subject: "Email Verification",
    text: `Please verify your email by clicking the link: ${process.env.BASE_URL}/api/auth?token=${verificationToken}`,
  });

  res.status(201).json({
    message: "User registered successfully. Please verify your email.",
  });
}

async function verifyEmail(req, res) {
  const { token } = req.query;

  const user = await User.findByVerificationToken(token);
  if (!user) {
    return res
      .status(400)
      .json({ error: "Invalid or expired verification token." });
  }

  await User.verifyUser(user.id);
  res.status(200).json({ message: "Email verified successfully!" });
}
