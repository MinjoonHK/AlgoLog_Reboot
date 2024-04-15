"use client";

import { Button, Form } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Avatar from "react-avatar";
import { PlusSquareOutlined, MinusSquareOutlined } from "@ant-design/icons";

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
  const [userId, setUserId] = useState<string>("");
  const [replyBoxVisible, setReplyBoxVisible] = useState<boolean[]>([]);
  const [editBoxVisible, setEditBoxVisible] = useState<boolean[]>([]);
  const session = getSession();

  const fetchComments = async () => {
    const result = await axios
      .get("/api/comment/comment", {
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
        setUserId(res?.user?.email);
      }
    });
  }, []);

  const onFinish = async ({ comment }) => {
    try {
      const res = await axios.post("/api/comment/comment", {
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

  const toggleReplyBox = (index) => {
    setReplyBoxVisible((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const toggleEditBox = (index) => {
    setEditBoxVisible((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const deleteComment = async (commentId) => {
    try {
      const res = await axios.delete("/api/comment/comment", {
        data: { commentId },
      });
      if (res) {
        Swal.fire({
          icon: "success",
          title: "성공적으로 댓글이 삭제되었습니다!",
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
          <div key={index}>
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "5px",
                color: "black",
                marginBottom: isLoggedIn ? "0" : "3%",
              }}
            >
              <div style={{ padding: "20px 20px" }}>
                <div>
                  <div
                    className="comment_top"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div
                      className="author_info"
                      style={{ display: "flex", flexDirection: "row" }}
                    >
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
                    {userId === comment.authorEmail ||
                    userId === "admin@gmail.com" ? (
                      <div
                        style={{
                          width: "15%",
                          display: "flex",
                          justifyContent: "flex-end",
                          color: "rgb(128,128,128)",
                        }}
                      >
                        <span
                          style={{ marginRight: "7%", cursor: "pointer" }}
                          onClick={() => {
                            toggleEditBox(index);
                          }}
                        >
                          {editBoxVisible[index] ? "" : "수정"}
                        </span>
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            deleteComment(comment._id);
                          }}
                        >
                          삭제
                        </span>
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                </div>
                <div style={{ paddingTop: "3%" }}>
                  {editBoxVisible[index] ? (
                    <div>
                      <Form>
                        <Form.Item
                          initialValue={comment.comment}
                          name="comment"
                        >
                          <TextArea rows={3} />
                        </Form.Item>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "right",
                            marginTop: "2%",
                          }}
                        >
                          <Button
                            onClick={() => {
                              toggleEditBox(index);
                            }}
                            style={{
                              color: "rgb(128,128,128)",
                              fontWeight: "bold",
                              borderColor: "transparent",
                              marginRight: "2%",
                              backgroundColor: "transparent",
                            }}
                          >
                            취소
                          </Button>

                          <Button
                            style={{
                              color: "white",
                              backgroundColor: "#8761E1",
                              fontWeight: "bold",
                              width: "10%",
                            }}
                            htmlType="submit"
                          >
                            댓글 수정
                          </Button>
                        </div>
                      </Form>
                    </div>
                  ) : (
                    <p>{comment.comment}</p>
                  )}
                </div>
              </div>
            </div>
            <div style={{ display: isLoggedIn ? "" : "none" }}>
              <p
                onClick={() => {
                  toggleReplyBox(index);
                }}
                style={{ cursor: "pointer" }}
              >
                {replyBoxVisible[index] ? (
                  <>
                    <MinusSquareOutlined /> 숨기기
                  </>
                ) : (
                  <>
                    <PlusSquareOutlined /> 답글 추가
                  </>
                )}
              </p>
            </div>
            <div>
              {replyBoxVisible[index] && (
                <div
                  style={{
                    backgroundColor: "#8761E1",
                    borderRadius: "5px",
                    marginBottom: "5%",
                  }}
                >
                  <div style={{ padding: "20px" }}>
                    <Form onFinish={onFinish}>
                      <Form.Item name="comment">
                        <TextArea placeholder="댓글을 작성하세요" rows={6} />
                      </Form.Item>
                      <div style={{ display: "flex", justifyContent: "right" }}>
                        <Button
                          onClick={() => {
                            toggleReplyBox(index);
                          }}
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            border: "2px solid white",
                            marginRight: "2%",
                            backgroundColor: "transparent",
                          }}
                        >
                          취소
                        </Button>

                        <Button
                          style={{
                            color: "rgb(128,128,128)",
                            fontWeight: "bold",
                            width: "10%",
                          }}
                        >
                          답글 작성
                        </Button>
                      </div>
                    </Form>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
