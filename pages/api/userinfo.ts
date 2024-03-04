import connectDB from "@/database/db";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  let session: any = await getServerSession(req, res, authOptions);

  const db = (await connectDB).db("algolog");
  if (req.method == "GET") {
    try {
      if (session && session.user != undefined) {
        const result = await db
          .collection("users")
          .find({ email: session.user.email })
          .toArray();
        if (result) {
          return res.status(200).json(result[0]);
        }
      }
    } catch (err) {
      res.status(500).json({
        error: "Internal Server Error",
        message: "DB에서 정보를 불러오는데 실패하였습니다",
      });
    }
  }
}
