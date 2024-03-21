import connectDB from "@/database/db";
import SolutionBoardData from "./solutionBoardData";

export default async function SolutionBoard() {
  return (
    <div>
      <SolutionBoardData />
    </div>
  );
}
