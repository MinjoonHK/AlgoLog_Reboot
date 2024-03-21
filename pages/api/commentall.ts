import connectDB from "@/database/db";

export default async (req, res) => {
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
};
