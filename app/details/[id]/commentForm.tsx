"use client";

import { Button, Form } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Avatar from "react-avatar";
import { PlusSquareOutlined } from "@ant-design/icons";

interface Comment {
  _id: string;
  comment: string;
  postId: string;
  author: string;
  authorEmail: string;
  createdAt: string;
  deletedAt: string | null;
}

export default function CommentForm(props: any) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const session = getSession();
  console.log(comments);
  const fetchComments = async () => {
    const result = await axios
      .get("/api/comment", {
        params: { postId: props.postId },
      })
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => {
        console.log(err);
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

  const onFinishReply = async ({ reply }) => {
    try {
      const res = await axios.post("/api/commentReply", {
        reply,
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
          <div>
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "5px",
                color: "black",
              }}
              key={index}
            >
              <div style={{ padding: "20px 20px" }}>
                <div>
                  <div>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <Avatar
                        name={comment.author}
                        size="40"
                        round={true}
                        textSizeRatio={2}
                        style={{ marginRight: "10px" }}
                      />
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <span>{comment.author}</span>
                        <span style={{ color: "gray" }}>
                          {comment.createdAt.slice(0, 10)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ paddingTop: "3%" }}>
                  <p>{comment.comment}</p>
                </div>
              </div>
            </div>
            <div style={{ display: isLoggedIn ? "" : "none" }}>
              <p onClick={() => {
                
              }}>
                <PlusSquareOutlined /> 답글 추가
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
