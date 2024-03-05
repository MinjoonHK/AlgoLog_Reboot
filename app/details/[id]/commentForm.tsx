"use client";

import { Button, Divider, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface Comment {
  _id: string;
  comment: string;
  postId: string;
  author: string;
  authorEmail: string;
  createdAt: Date;
  deletedAt: Date | null;
}

export default function CommentForm(props: any) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [comments, setCommnets] = useState<Comment[]>([]);
  const session = getSession();

  const fetchComments = async () => {
    const result = await axios
      .get("/api/comment", {
        params: { postId: props.postId },
      })
      .then((res) => {
        setCommnets(res.data);
      });
  };

  useEffect(() => {
    fetchComments();
    session.then((res) => {
      if (res?.user?.email) {
        setIsLoggedIn(true);
      }
    });
  }, []);
  console.log(comments);
  const onFinish = async ({ comment }) => {
    try {
      const res = await axios.post("/api/comment", {
        comment,
        postId: props.postId,
      });
      if (res) {
        Swal.fire({
          icon: "success",
          title: "성공적으로 댓글이 작성되었습니다!",
        });
        fetchComments();
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Form style={{ display: isLoggedIn ? "" : "none" }} onFinish={onFinish}>
        <Form.Item name="comment">
          <TextArea placeholder="댓글을 작성하세요" rows={6} />
        </Form.Item>
        <Form.Item style={{ display: "flex", justifyContent: "right" }}>
          <Button
            style={{
              color: "white",
              backgroundColor: "rgb(135,97,225)",
              border: "none",
            }}
            htmlType="submit"
          >
            댓글 작성
          </Button>
        </Form.Item>
      </Form>
      <div>
        {comments.map((comment, index) => (
          <div
            style={{ backgroundColor: "white", borderRadius: "15px" }}
            key={index}
          >
            <div style={{ alignItems: "center" }}>{comment.author}</div>
            <Divider style={{ border: "0.5px solid black" }} />
            <div style={{ backgroundColor: "white" }}>
              <p>{comment.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
