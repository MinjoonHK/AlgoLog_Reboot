"use client";

import { Button, Card, Col, Form, Input, Row } from "antd";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";
import Timer from "./timer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/Redux/store";
import { start } from "@/lib/Redux/Features/timer/timerSlice";
import emailVerification from "@/pages/api/auth/sendEmail";

const inputStyle = {
  width: "364.4px",
};
const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function SignUp() {
  const [form] = Form.useForm();
  const router = useRouter();
  const { data: session, status } = useSession();
  const timer = useSelector((state: RootState) => state.timer.value);
  const dispatch = useDispatch();

  if (status === "authenticated" && session.user != undefined) {
    console.log(session, status);
  }

  const [emailSend, setEmailSend] = useState(false);
  const [verified, setVerified] = useState(false);

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

  //send random number
  const sendEmail = async () => {
    try {
      const res = await axios.post("/api/auth/sendEmail", {
        to: form.getFieldValue("email"),
      });
      if (res.data.status == "success") {
        Swal.fire({
          icon: "success",
          title: "인증번호가 전송되었습니다!",
          text: "이메일을 확인해주세요!",
          showConfirmButton: true,
          timer: 2000,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const confirmVarification = async () => {
    const res = await axios.get("/api/auth/sendEmail", {
      params: {
        code: form.getFieldValue("code"),
      },
    });
    if (res.data.status == "success") {
      setVerified(true);
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
            {emailSend && (
              <Form.Item
                style={{
                  marginBottom: 0, // 상위 Form.Item의 하단 마진을 0으로 설정
                }}
              >
                <Form.Item
                  name="code"
                  style={{
                    display: "inline-block",
                    width: "77%",
                    marginRight: "8px",
                  }}
                >
                  <Input placeholder="인증번호를 입력해 주세요!" size="large" />
                </Form.Item>

                <Button size="large">
                  <Timer />
                </Button>
              </Form.Item>
            )}

            {!emailSend && (
              <Form.Item>
                <Button
                  style={{
                    width: "100%",
                    fontWeight: "bold",
                    backgroundColor: "rgb(135,97,225)",
                    color: "white",
                    border: "none",
                  }}
                  size="large"
                  onClick={() => {
                    const userEmail = form.getFieldValue("email");
                    if (!emailFormat.test(userEmail)) {
                      if (userEmail === undefined) {
                        Swal.fire({
                          icon: "error",
                          title: "이메일을 입력해주세요!",
                          showConfirmButton: true,
                          timer: 2000,
                        });
                      }
                    } else {
                      sendEmail();
                      setEmailSend(true);
                      dispatch(start());
                    }
                  }}
                >
                  이메일로 인증번호 보내기
                </Button>
              </Form.Item>
            )}

            {emailSend && (
              <Form.Item>
                <Button
                  style={{
                    width: "100%",
                    fontWeight: "bold",
                    backgroundColor: "rgb(135,97,225)",
                    color: "white",
                    border: "none",
                  }}
                  size="large"
                  onClick={() => {
                    confirmVarification();
                  }}
                >
                  {verified ? "인증되었습니다!" : "인증번호 확인하기"}
                </Button>
              </Form.Item>
            )}
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
            <Form.Item>
              <Button
                htmlType="button"
                style={{
                  width: "100%",
                  height: "46.4px",

                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "20px",
                  backgroundColor: "rgb(135,97,225)",
                  color: "white",
                  border: "none",
                }}
                onClick={() => {
                  if (verified) {
                    form.submit();
                  } else {
                    Swal.fire({
                      icon: "error",
                      title: "이메일 인증을 완료해주세요!",
                      showConfirmButton: true,
                      timer: 2000,
                    });
                  }
                }}
              >
                회원가입
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
}

export default SignUp;
