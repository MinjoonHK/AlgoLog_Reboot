import NodeMailer from "./nodemailer";

function generateCode(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

let globalCode = 0;

export default function emailVerification(req, res) {
  if (req.method === "POST") {
    let code = generateCode(100000, 999999);
    globalCode = code;
    let sender = req.body.to;
    try {
      let result: any = NodeMailer({ code: code, sender: sender });
      if (result) {
        res.status(200).json({
          message: "성공적으로 인증번호를 보냈습니다",
          status: "success",
        });
      }
    } catch (error) {
      console.log(error);
      res
        .status(400)
        .json({ message: "인증번호 전송에 실패하였습니다", status: "error" });
    }
  }

  if (req.method === "GET") {
    let code = req.query.code;
    if (code == globalCode) {
      res
        .status(200)
        .json({ message: "인증에 성공하였습니다", status: "success" });
    } else {
      res
        .status(400)
        .json({ message: "인증에 실패하였습니다", status: "error" });
    }
  }
}
