"use client";

import { DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getSession } from "next-auth/react";

export default function DeleteButton(props: any) {
  const Router = useRouter();
  const session = getSession();
  const [isHovered, setIsHovered] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  useEffect(() => {
    session.then((res) => {
      if (res?.user?.email) {
        setUserEmail(res.user.email);
      }
    });
  }, []);

  return (
    <div
      style={{
        display:
          props.userEmail == userEmail || userEmail == "admin@gmail.com"
            ? "flex"
            : "none",
        justifyContent: "right",
        marginBottom: "2%",
      }}
    >
      <Button
        onMouseOver={() => {
          setIsHovered(true);
        }}
        onMouseOut={() => {
          setIsHovered(false);
        }}
        onClick={() => {
          axios
            .delete("/api/posts", { data: { _id: props.postId } })
            .then(() => {
              Swal.fire({
                icon: "success",
                title: "성공적으로 삭제되었습니다!",
              });
              Router.push("/dashboard/mysolutions");
            });
        }}
        style={{
          backgroundColor: isHovered ? "red" : "rgb(135,97,225)",
          color: "white",
          border: "none",
        }}
      >
        <DeleteOutlined />
        삭제하기
      </Button>
      {/* <DeleteModal isModalOpen={isModalOpen} onCancel = {setIsModalOpen(false)} /> */}
    </div>
  );
}
