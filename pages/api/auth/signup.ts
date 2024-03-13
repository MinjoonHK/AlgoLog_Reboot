import connectDB from "@/database/db";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  const db = (await connectDB).db("algolog");
  if (req.method == "POST") {
    let hashedPassword = await bcrypt.hash(req.body.password, 10);
    let insertUserInfo = {
      ...req.body,
      name: req.body.username,
      password: hashedPassword,
      createdAt: new Date(),
      exitedAt: null,
    };

    const checkUserExist = await db
      .collection("users")
      .findOne({ email: req.body.email });
    if (checkUserExist) {
      return res
        .status(400)
        .json({ message: "이미 가입한 이메일입니다", code: "4001" });
    }

    const result = await db.collection("users").insertOne(insertUserInfo);
    if (result) {
      return res
        .status(200)
        .json({ message: "회원가입이 완료되었습니다", code: "4000" });
    }
  }
}
