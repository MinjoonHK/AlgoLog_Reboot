"use client";

import { Button, Card, Form, Input } from "antd";
import axios from "axios";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface UserInfo {
  name: string;
  email: string;
  createdAt: string;
  image: string;
}

const nullInfo = {
  name: "",
  email: "",
  createdAt: "",
  image: "",
};

export default function MyInfoData() {
  const session = getSession();
  const router = useRouter();
  session.then((res) => {
    if (res == null) {
      Swal.fire({
        icon: "error",
        title: "로그인 필요",
        text: "로그인이 필요한 서비스입니다.",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/auth/login");
        }
      });
    }
  });

  const [userInfo, setUserInfo] = useState<UserInfo>(nullInfo);
  const [clickFix, setClickFix] = useState(false);
  const fetchUserInfo = async () =>
    await axios.get("/api/userinfo").then((response) => {
      setUserInfo(response.data);
    });

  useEffect(() => {
    fetchUserInfo();
  }, []);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        paddingTop: "5%",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "25px",
          width: "50%",
          padding: "3% 0",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Form style={{ width: "80%" }}>
          <Form.Item
            style={{ display: "inline-block", width: "calc(50% - 8px)" }}
            label="이름"
          >
            {clickFix ? (
              <Input value={userInfo.name} />
            ) : (
              <Input value={userInfo.name} disabled />
            )}
          </Form.Item>
          <Form.Item
            style={{
              display: "inline-block",
              width: "calc(50% - 8px)",
              marginLeft: "8px",
            }}
          >
            <Button
              onClick={() => {
                setClickFix(true);
              }}
            >
              수정
            </Button>
          </Form.Item>
          <Form.Item label="가입한날">
            {userInfo.createdAt?.slice(0, 10)}
          </Form.Item>
          <Form.Item label="이메일">{userInfo.email}</Form.Item>
          <Form.Item
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "5%",
            }}
          >
            <Button
              htmlType="submit"
              style={{
                backgroundColor: "rgb(135,97,225)",
                color: "white",
                border: "none",
              }}
            >
              수정사항 적용하기
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
