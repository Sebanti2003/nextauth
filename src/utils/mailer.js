import nodemailer from "nodemailer";
import User from "../models/user.model";
import bcryptjs from "bcryptjs";
// import uuid from "uuid";
// import { v4 as uuidv4 } from "uuid";
export const sendEmail = async ({ email, emailtype, userid }) => {
  try {
    const token = await bcryptjs.hash(userid.toString(), 10);
    if (emailtype === "Verify") {
      await User.findByIdAndUpdate(userid, {
        $set: {
          verifytoken: token,
          verifytokenExpiry: Date.now() + 3600000,
        },
      });
    }
    if (emailtype === "Reset") {
      await User.findByIdAndUpdate(userid, {
        $set: {
          forgotpasswordtoken: token,
          forgotpasswordtokenExpiry: Date.now() + 3600000,
        },
      });
    }
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject:
        emailtype === "Reset" ? "Reset your Account Password" : "Verify Email",
      html: `
                <h1>Hi, ${email}</h1>
                <p>${
                  emailtype === "Reset"
                    ? "Click this link to reset your password"
                    : "Click this link to verify your email"
                } <a href="${
        process.env.NEXTAUTH_URL
      }/verify?token=${token}">Verify Account</a></p>
      <p>This link will expire in an hour. the token is ${token}</p>
                <p>Best regards, <br> Sebanti's Team</p>
                `,
    };
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default sendEmail;
