import connectDB from "@/database/db";
import SolutionBoardData from "./solutionBoardData";

export default async function SolutionBoard() {
  const db = (await connectDB).db("algolog");
  let result = await db
    .collection("comment")
    .find({ deletedAt: null })
    .toArray();

  return (
    <div>
      <SolutionBoardData comment={JSON.stringify(result)} />
    </div>
  );
}
