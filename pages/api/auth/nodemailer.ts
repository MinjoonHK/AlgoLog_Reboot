import { Resend } from "resend";
import fs from "fs";
import path from "path";
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});
// console.log(path.join(__dirname, "/template/emailTemplate.html"));
// let html = fs.readFileSync("./template/emailTemplate.html", "utf-8");
// Object.keys(props).forEach((key) => {
//   html = html.replace(new RegExp(`{{${key}}}`, "g"), props[key]); //props를 {{}} 머스태시 문법으로 html 에 연결
// });
export default async function NodeMailer(props) {
  let sender = props.sender;
  const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: sender,
    subject: "AlgorithmLog 인증메일 입니다",
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body>
    <div>
      <h2>${props.code}</h2>
      <div>인증번호 입니다</div>
    </div>
  </body>
</html>
`,
  });
  if (info) {
    return true;
  } else {
    return false;
  }
}

// const resend = new Resend(process.env.RESEND_AUTH);

// export default async function NodeMailer(props) {
//   let html = fs.readFileSync("./template/emailTemplate.html", "utf-8");
//   Object.keys(props).forEach((key) => {
//     html = html.replace(new RegExp(`{{${key}}}`, "g"), props[key]); //props를 {{}} 머스태시 문법으로 html 에 연결
//   });
//   let destination = props.sender;
//   const { data, error } = await resend.emails.send({
//     from: "no-reply@resend.dev",
//     to: destination,
//     subject: "AlgorithmlLog 인증메일 입니다",
//     html: html,
//   });
//   console.log({ data });

//   if (data) {
//     return true;
//   } else if (error) {
//     console.log(error);
//     return false;
//   }
// }
