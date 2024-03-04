"use client";

import { Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";

export default function CommentForm() {
  return (
    <div>
      <Form>
        <Form.Item>
          <TextArea placeholder="댓글을 작성하세요" rows={6} />
        </Form.Item>
      </Form>
    </div>
  );
}
