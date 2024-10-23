import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.NODEMAILER_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASS,
  },
});

async function verifyTransporter() {
  try {
    await transporter.verify();
  } catch (error) {
    console.log("Error verifyng transporter", error);
  }
}

verifyTransporter();

export default transporter;
