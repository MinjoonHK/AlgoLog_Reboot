"use client";

import { Button, Checkbox, Form, Input, Card, Divider, Avatar } from "antd";
import Link from "next/link";
import SocialLogin from "./socailLogin";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

function Login() {
  const router = useRouter();
  const onFinish = async ({ email, password }) => {
    const result = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });
    if (result) {
      if (result.status == 401) {
        Swal.fire({
          icon: "error",
          title: "로그인 실패",
          text: "아이디 또는 비밀번호가 일치하지 않습니다.",
        });
      } else {
        router.push("/dashboard/solutionboard");
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "calc(100% - 16px)",
        minHeight: "100vh",
        flexWrap: "wrap",
      }}
    >
      <Card
        style={{
          width: "500px",
          textAlign: "center",
          paddingTop: "35px",
          backgroundColor: "transparent",
          border: "transparent",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            textAlign: "center",
            fontSize: "45px",
            fontWeight: "bold",
            color: "white",
          }}
        >
          A L G O L O G
        </div>
        <Form
          name="Login"
          layout="vertical"
          style={{
            maxWidth: 600,
            margin: "30px 500px",
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="email"
            rules={[
              { type: "email", message: "올바른 이메일 형식이 아닙니다" },
              { required: true, message: "이메일을 입력해 주세요" },
            ]}
            style={{ width: "364.4px", height: "46.4px" }}
          >
            <Input
              type="email"
              placeholder="이메일"
              size="large"
              autoComplete={"email"}
              className="inputValue"
              height="46.4px"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "비밀번호를 입력해 주세요" }]}
            style={{ width: "364.4px", height: "46.4px" }}
          >
            <Input.Password
              type="password"
              size="large"
              placeholder="비밀번호"
              className="inputValue"
            />
          </Form.Item>
          <Form.Item style={{ width: "364.4px" }}>
            <Button
              htmlType="submit"
              style={{
                width: "100%",
                height: "46.4px",
                backgroundColor: "rgb(135,97,225)",
                color: "white",
                borderColor: "transparent",
                alignItems: "center",
                display: "flex",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  width: "100%",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                로그인
              </div>
            </Button>
          </Form.Item>

          <Form.Item style={{ width: "364.4px", height: "46.4px" }}>
            <Link href="/auth/signup">
              <Button
                style={{
                  width: "100%",
                  height: "46.4px",
                  color: "black",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    width: "100%",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  회원가입
                </div>
              </Button>
            </Link>
            <Divider style={{ width: "364.4px", color: "white" }}>
              SNS 계정으로 로그인
            </Divider>
            <SocialLogin />
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Login;
