"use client";
import { Provider } from "react-redux";
import { store } from "../lib/store.ts";
import SolutionBoardData from "./dashboard/solutionboard/solutionBoardData.tsx";

export default async function Home() {
  return (
    <div>
      <Provider store={store}>
        <SolutionBoardData />
      </Provider>
    </div>
  );
}
