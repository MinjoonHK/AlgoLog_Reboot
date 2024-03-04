"use client";

import { Avatar, Button } from "antd";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function SocialLogin() {
  const router = useRouter();
  return (
    <div>
      <div>
        <Button
          onClick={async () => {
            await signIn("naver", { callbackUrl: "/dashboard/solutionboard" });
          }}
          style={{ height: "40px", width: "364.4px", marginTop: "15px" }}
        >
          <span style={{ marginRight: "7%", fontWeight: "bold" }}>
            네이버계정으로 로그인하기
          </span>
          <Avatar size={30} src={"/img/naver_icon.png"} />
        </Button>
      </div>
      <div>
        <Button
          onClick={async () => {
            await signIn("github", { callbackUrl: "/dashboard/solutionboard" });
          }}
          style={{ height: "40px", width: "364.4px", marginTop: "15px" }}
        >
          <span style={{ marginRight: "10%", fontWeight: "bold" }}>
            깃헙계정으로 로그인 하기
          </span>
          <Avatar
            style={{ cursor: "pointer" }}
            size={30}
            src={"/img/github_icon.png"}
          />
        </Button>
      </div>
      <div>
        <Button
          onClick={async () => {
            await signIn("google", { callbackUrl: "/dashboard/solutionboard" });
            if (!signIn) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                footer: '<a href="#">Why do I have this issue?</a>',
              });
            }
          }}
          style={{ height: "40px", width: "364.4px", marginTop: "15px" }}
        >
          <span style={{ marginRight: "10%", fontWeight: "bold" }}>
            구글계정으로 로그인 하기
          </span>
          <Avatar size={30} src={"/img/google_icon3.png"} />
        </Button>
      </div>
    </div>
  );
}
