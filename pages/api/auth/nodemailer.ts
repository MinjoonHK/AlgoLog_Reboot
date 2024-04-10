const nodemailer = require("nodemailer");
import fs from "fs";

const transporter = nodemailer.createTransport({
  host: "gmail",
  port: 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  secure: true,
});

export default async function NodeMailer(props) {
  let html = fs.readFileSync("./template/emailTemplate.html", "utf-8");
  Object.keys(props).forEach((key) => {
    html = html.replace(new RegExp(`{{${key}}}`, "g"), props[key]); //props를 {{}} 머스태시 문법으로 html 에 연결
  });
  let sender = props.sender;
  const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: sender,
    subject: "AlgorithmLog 인증메일 입니다",
    html: html,
  });
  if (info) {
    return true;
  } else {
    return false;
  }
}
