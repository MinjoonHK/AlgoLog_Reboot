"use client";

import { Button, Card, Form, Input } from "antd";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const inputStyle = {
  width: "364.4px",
};

function SignUp() {
  const [form] = Form.useForm();
  const router = useRouter();
  const { data: session, status } = useSession();
  if (status === "authenticated" && session.user != undefined) {
    console.log(session, status);
  }

  const onFinish = async ({ email, password, username }) => {
    try {
      const res = await axios.post("/api/auth/signup", {
        email,
        password,
        username,
      });
      if (res.data.code === "4000") {
        Swal.fire({
          icon: "success",
          title: "회원가입이 완료되었습니다!",
          showConfirmButton: true,
          timer: 1500,
        }).then(() => {
          router.push("/auth/login");
        });
      }
    } catch (err) {
      if (err.response.data.code === "4001") {
        Swal.fire({
          icon: "error",
          title: "이미 가입한 이메일입니다!",
          showConfirmButton: true,
          timer: 1500,
        });
      }
    }
  };

  return (
    <div>
      <div
        style={{
          textAlign: "center",
          fontSize: "25px",
          paddingTop: "8%",
          fontWeight: "bold",
        }}
      >
        Welcome To AlgoLog!
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card
          style={{
            width: 500,
            border: "transparent",
            display: "flex",
            justifyContent: "center",
            backgroundColor: "transparent",
          }}
        >
          <Form
            form={form}
            onFinish={onFinish}
            name="nest-messages"
            style={{ maxWidth: 600, textAlign: "center" }}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  message: "올바른 이메일 형식을 작성해 주세요!",
                },
                {
                  required: true,
                  message: "이메일을 입력해 주세요!",
                },
              ]}
            >
              <Input placeholder="이메일" size="large" />
            </Form.Item>
            <Form.Item
              style={inputStyle}
              name="password"
              rules={[
                {
                  required: true,
                  message: "비밀 번호를 입력해 주세요!",
                },
              ]}
              hasFeedback
            >
              <Input.Password placeholder="비밀번호" size="large" />
            </Form.Item>

            <Form.Item
              style={inputStyle}
              name="confirm"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "비밀 번호를 입력해 주세요!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("비밀 번호를 확인해 주세요!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password placeholder="비밀번호 확인" size="large" />
            </Form.Item>
            <Form.Item
              name="username"
              rules={[{ required: true, message: "이름을 입력해주세요!" }]}
              style={inputStyle}
            >
              <Input placeholder="이름" size="large" height="46.4px" />
            </Form.Item>
            <Form.Item style={{ width: "364.4px", height: "46.4px" }}>
              <Button
                htmlType="submit"
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
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
}

export default SignUp;
