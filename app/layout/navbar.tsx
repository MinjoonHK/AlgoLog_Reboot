import { cookies } from "next/headers";
import Link from "next/link";
import "./darkMode.css";

import DarkMode from "./darkMode";
import SignOut from "./signOut";

const NavBar = () => {
  let mode = cookies().get("mode");
  return (
    <div>
      <div
        className={
          mode != undefined && mode.value == "dark"
            ? "navBarDark"
            : "navBarLight"
        }
      >
        <div style={{ marginLeft: "5%" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid black",
              borderRadius: "25px",
              backgroundColor: "rgb(135,97,225)",
              width: "160px",
              height: "40px",
              color: "white",
            }}
          >
            <img
              style={{ width: "24px", height: "24px" }}
              src="/img/algoIcon.png"
              alt=""
            />
            <span
              style={{
                fontWeight: "bold",
                fontSize: "24px",
                marginLeft: "5px",
              }}
            >
              ALGOLOG
            </span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginRight: "10%",
            width: "30%",
            marginLeft: "20%",
          }}
        >
          <div>
            <Link
              className={
                mode != undefined && mode.value == "dark"
                  ? "navBarComponentDark"
                  : "navBarComponentLight"
              }
              href="/dashboard/mysolutions"
            >
              내 풀이들
            </Link>
          </div>
          <div>
            <Link
              className={
                mode != undefined && mode.value == "dark"
                  ? "navBarComponentDark"
                  : "navBarComponentLight"
              }
              href="/dashboard/solutionboard"
            >
              다른풀이 둘러보기
            </Link>
          </div>
          {/* <div>
            <Link
              className={
                mode != undefined && mode.value == "dark"
                  ? "navBarComponentDark"
                  : "navBarComponentLight"
              }
              href="/dashboard/noticeboard"
            >
              정보 공유 게시판
            </Link>
          </div> */}
          <div>
            <Link
              className={
                mode != undefined && mode.value == "dark"
                  ? "navBarComponentDark"
                  : "navBarComponentLight"
              }
              href="/dashboard/myinfo"
            >
              내 정보
            </Link>
          </div>
        </div>
        <SignOut />
        <DarkMode />
      </div>
    </div>
  );
};

export default NavBar;
