"use client";

import { divider } from "@uiw/react-md-editor";
import MarkDown from "./markDownForm";
import { Button, Card, Form, Input, Spin } from "antd";
import axios from "axios";
import { useState } from "react";

function TextForm() {
  const [content, setContent] = useState("");
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async ({ message }) => {
    setIsLoading(true);
    try {
      let res = await axios.post("/api/gpt/gpt", { message });
      if (res.data.status === "success") {
        form.resetFields();
        setContent(res.data.response.choices[0].message.content);
        console.log(res.data);
      } else {
        console.log("failed to send message");
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <Form onFinish={onFinish} form={form}>
        <Form.Item name="message">
          <Input.TextArea
            rows={6}
            placeholder="정답이 궁금한 문제를 입력하세요. 반례와 함께 알려드릴게요!"
          />
        </Form.Item>
        <Form.Item>
          <div style={{ display: "flext", justifyContent: "right" }}>
            <Button
              htmlType="submit"
              style={{
                width: "20%",
                backgroundColor: "rgb(135,97,225)",
                color: "white",
                border: "none",
                textAlign: "center",
              }}
            >
              AI 에게 물어보기
            </Button>
          </div>
        </Form.Item>
      </Form>
      {isLoading ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "10%",
            height: "50%",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Spin size="large" />
            <div style={{ color: "white", marginTop: "5%" }}>
              AI가 답변을 생성하고 있습니다...
            </div>
          </div>
        </div>
      ) : (
        <Card
          style={{
            border: "transparent",
            display: content == "" ? "none" : "block",
          }}
        >
          <MarkDown result={content} />
        </Card>
      )}
    </div>
  );
}

export default TextForm;
