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
          .collection("post")
          .find({
            authorEmail: session.user.email,
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
    let insertImage;

    if (req.body.sitename == "baekjoon") {
      insertImage = "/img/baekjoonLogo.png";
      req.body.title = "[백준] " + req.body.title;
    } else if (req.body.sitename == "leetcode") {
      insertImage = "/img/leetCodeLogo.png";
      req.body.title = "[LeetCode] " + req.body.title;
    } else if (req.body.sitename == "programmers") {
      insertImage = "/img/programmersLogo.jpg";
      req.body.title = "[프로그래머스] " + req.body.title;
    } else if (req.body.sitename == "softeer") {
      insertImage = "/img/softeerLogo.png";
      req.body.title = "[소프티어] " + req.body.title;
    } else {
      insertImage = "/img/sweaLogo.png";
      req.body.title = "[SWEA] " + req.body.title;
    }

    let insertObject = {
      ...req.body,
      author: userName,
      authorEmail: userEmail,
      image: insertImage,
      createdAt: new Date(),
      deletedAt: null,
    };
    try {
      const result = await db.collection("post").insertOne(insertObject);
      if (result) {
        return res.status(200).json({
          message: "DB에 POST 정보를 저장하는데 성공하였습니다",
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
        .collection("post")
        .updateOne(
          { _id: new ObjectId(req.body._id) },
          { $set: { deletedAt: new Date() } }
        );
      if (result) {
        return res.status(200).json({
          message: "DB에서 POST 정보를 삭제하는데 성공하였습니다",
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
