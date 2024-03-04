import { EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Link from "next/link";

export default function NoticeBoard() {
  return (
    <div style={{ paddingTop: "5%" }}>
      <div
        style={{
          marginRight: "20%",
          marginLeft: "20%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "right",
            marginBottom: "3%",
          }}
        >
          <Button
            style={{
              backgroundColor: "rgb(135,97,225)",
              border: "transparent",
              color: "white",
              fontWeight: "bold",
            }}
          >
            <Link href="/boardwrite">
              <EditOutlined /> 글 작성하기
            </Link>
          </Button>
        </div>
        <div
          style={{
            backgroundColor: "white",
            border: "1px solid rgb(229,229,229)",
          }}
        >
          게시판
        </div>
      </div>
    </div>
  );
}
