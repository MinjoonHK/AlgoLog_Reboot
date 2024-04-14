// "use client";

// import Timer from "@/app/auth/signup/timer";
// import {
//   decrement,
//   increment,
//   incrementByAmount,
// } from "@/lib/Redux/Features/counter/counterSlice";
// import { RootState } from "@/lib/Redux/store";
// import { EditOutlined } from "@ant-design/icons";

// import { Button } from "antd";
// import Link from "next/link";
// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// export default function NoticeBoard() {
//   const [timerStarted, setTimerStarted] = useState(false);
//   const count = useSelector((state: RootState) => state.counter.value);
//   const dispatch = useDispatch();
//   return (
//     <div style={{ paddingTop: "5%" }}>
//       <div
//         style={{
//           marginRight: "20%",
//           marginLeft: "20%",
//         }}
//       >
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "right",
//             marginBottom: "3%",
//           }}
//         >
//           <Button
//             style={{
//               backgroundColor: "rgb(135,97,225)",
//               border: "transparent",
//               color: "white",
//               fontWeight: "bold",
//             }}
//           >
//             <Link href="/boardwrite">
//               <EditOutlined /> 글 작성하기
//             </Link>
//           </Button>
//         </div>
//         <div
//           style={{
//             backgroundColor: "white",
//             border: "1px solid rgb(229,229,229)",
//           }}
//         >
//           게시판
//         </div>
//       </div>
//       <div>{count}</div>
//       <button
//         onClick={() => {
//           dispatch(increment());
//         }}
//       >
//         increment
//       </button>
//       <button
//         onClick={() => {
//           dispatch(decrement());
//         }}
//       >
//         decrement
//       </button>
//       <button
//         onClick={() => {
//           dispatch(incrementByAmount(2));
//         }}
//       >
//         increment by 2
//       </button>
//       <button
//         onClick={() => {
//           setTimerStarted(true);
//         }}
//       >
//         timer start
//       </button>
//       <Timer isStarted={setTimerStarted} />
//     </div>
//   );
// }
