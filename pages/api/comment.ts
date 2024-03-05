import connectDB from "@/database/db";
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { ObjectId } from "mongodb";

interface Session {
  user: {
    name: string;
    email: string;
    image: string;
  };
  expires: string;
}

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
      if (session && session.user != undefined) {
        const result = await db
          .collection("comment")
          .find({
            postId: req.query.postId,
            deletedAt: null,
          })
          .toArray();
        if (result) {
          return res.status(200).json(result);
        }
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
    let insertObject = {
      ...req.body,
      author: userName,
      authorEmail: userEmail,
      createdAt: new Date(),
      deletedAt: null,
    };
    try {
      const result = await db.collection("comment").insertOne(insertObject);
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

  if (req.method == "DELETE") {
    try {
      const result = await db
        .collection("comment")
        .updateOne(
          { _id: new ObjectId(req.body._id) },
          { $set: { deletedAt: new Date() } }
        );
      if (result) {
        return res.status(200).json({
          message: "DB에서 COMMENT 정보를 삭제하는데 성공하였습니다",
          status: "success",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: "fail",
        error: "Internal Server Error",
        message: "DB에서 정보를 삭제하는데 실패하였습니다",
      });
    }
  }
};
