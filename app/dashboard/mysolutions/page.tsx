import connectDB from "@/database/db";
import MySolutionsData from "./mySolutionsData";

export default async function MySoltuons() {
  const db = (await connectDB).db("algolog");
  let result = await db
    .collection("comment")
    .find({ deletedAt: null })
    .toArray();

  return (
    <div>
      <MySolutionsData comment={JSON.stringify(result)} />
    </div>
  );
}
