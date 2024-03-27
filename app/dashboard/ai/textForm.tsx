"use client";

import MarkDown from "./markDownForm";
import { Button, Card, Form, Input } from "antd";
import axios from "axios";
import { useState } from "react";

function TextForm() {
  const [content, setContent] = useState("");
  const [form] = Form.useForm();

  const onFinish = async ({ message }) => {
    try {
      let res = await axios.post("/api/gpt/gpt", { message });
      if (res.data.status === "success") {
        form.resetFields();
        setContent(res.data.response.choices[0].message.content);
      } else {
        console.log("failed to send message");
      }
    } catch (error) {
      console.log(error);
    }
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
                width: "10%",
                backgroundColor: "rgb(135,97,225)",
                color: "white",
                border: "none",
              }}
            >
              Submit
            </Button>
          </div>
        </Form.Item>
      </Form>

      <Card
        style={{
          border: "transparent",
          display: content == "" ? "none" : "block",
        }}
      >
        <MarkDown result={content} />
      </Card>
    </div>
  );
}

export default TextForm;
