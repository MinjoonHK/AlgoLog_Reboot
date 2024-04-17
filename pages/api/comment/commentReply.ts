import connectDB from "@/database/db";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { _id } from "@next-auth/mongodb-adapter";
import { ObjectId } from "mongodb";

export default async (req, res) => {
  let session: Session | null = await getServerSession(req, res, authOptions);
  let userName;
  let userEmail;
  if (session && session.user != undefined) {
    userName = session.user.name;
    userEmail = session.user.email;
  }
  const db = (await connectDB).db("algolog");
  if (req.method == "GET") {
    try {
      const result = await db
        .collection("comment")
        .find({
          deletedAt: null,
        })
        .toArray();
      if (result) {
        return res.status(200).json(result);
      }
    } catch (err) {
      res.status(500).json({
        status: "fail",
        error: "Internal Server Error",
        message: "DB에서 정보를 불러오는데 실패하였습니다",
      });
    }
  }

  if (req.method == "POST") {
    let newReply = {
      reply: req.body.newReply,
      replier: userName,
      replierEmail: userEmail,
      createdAt: new Date(),
      deletedAt: null,
    };
    console.log(req.body);
    try {
      const result = await db
        .collection("comment")
        .updateOne(
          { _id: new ObjectId(req.body.commentId) },
          { $push: { replies: newReply } }
        );
      if (result) {
        return res.status(200).json({
          message: "DB에 COMMENT 정보를 저장하는데 성공하였습니다",
          status: "success",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: "fail",
        error: "Internal Server Error",
        message: "DB에 정보를 저장하는데 실패하였습니다",
      });
    }
  }
};
