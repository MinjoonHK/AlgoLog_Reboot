"use client";

import {
  Button,
  Card,
  Dropdown,
  MenuProps,
  Pagination,
  Space,
  Spin,
} from "antd";
import {
  DownOutlined,
  EditOutlined,
  HeartFilled,
  HeartOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import Meta from "antd/es/card/Meta";
import { useRouter } from "next/navigation";
import { getSession, useSession } from "next-auth/react";
import Swal from "sweetalert2";
import dropDwonItems from "./dropDownItems";

interface dataType {
  _id: string;
  title: string;
  content: string;
  image: string;
  author: string;
  CreatedAt: Date;
}

const MySolutionsData = (props) => {
  const session = getSession();
  const router = useRouter();

  session.then((res) => {
    if (res == null) {
      Swal.fire({
        icon: "error",
        title: "로그인 필요",
        text: "로그인이 필요한 서비스입니다.",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/auth/login");
        }
      });
    }
  });

  const [postItems, setPostItems] = useState<dataType[]>([]);
  const [loading, setLoading] = useState(true);
  const [heartClicked, setHeartClicked] = useState(false);
  const [filteredData, setFilteredData] = useState<dataType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  const fetchData = async () => {
    axios.get("/api/posts").then((response) => {
      setPostItems(response.data);
      setFilteredData(response.data);
    });
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
    setLoading(false);
  }, []);

  const handlePage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div style={{ padding: "2% 15%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "right",
            padding: "0 50px",
          }}
        >
          <div>
            <span>
              <Button style={{ marginLeft: "20px" }}>
                <Link href={"/write"}>
                  <EditOutlined /> 새 풀이
                </Link>
              </Button>
            </span>
          </div>
        </div>
        {loading ? (
          <div style={{ marginTop: "20%" }}>
            <Spin tip="Loading Data..." size="large">
              <div className="content" />
            </Spin>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateRows: "1fr",
              gridTemplateColumns: "1fr 1fr 1fr",
            }}
          >
            {filteredData
              .slice((currentPage - 1) * pageSize, currentPage * pageSize)
              .map((item, idx) => {
                return (
                  <div
                    key={idx}
                    style={{ margin: "25px", textAlign: "center" }}
                  >
                    <Card
                      loading={loading}
                      style={{ width: 310 }}
                      cover={
                        <Link
                          style={{ textDecoration: "none" }}
                          href={`/details/${item._id}`}
                        >
                          <img
                            style={{
                              width: 310,
                              height: 160,
                              cursor: "pointer",
                            }}
                            alt="example"
                            src={item.image}
                          />
                        </Link>
                      }
                    >
                      <Meta
                        style={{ height: 80, textAlign: "left" }}
                        title={item.title}
                        description={
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <span>{item.author}</span>
                            <span style={{ fontSize: "15px" }}>
                              {/* {heartClicked ? (
                                <span>
                                  <HeartFilled
                                    style={{ color: "red" }}
                                    onClick={() => {
                                      setHeartClicked(false);
                                    }}
                                  />
                                </span>
                              ) : (
                                <span>
                                  <HeartOutlined
                                    onClick={() => {
                                      setHeartClicked(true);
                                    }}
                                  />
                                </span>
                              )} */}
                              {
                                JSON.parse(props.comment).filter(
                                  (value) => value.postId == item._id
                                ).length
                              }
                              개의 댓글
                            </span>
                          </div>
                        }
                      />
                    </Card>
                  </div>
                );
              })}
          </div>
        )}
        <div
          style={{
            display: filteredData.length == 0 ? "none" : "flex",
            justifyContent: "center",
          }}
        >
          <Pagination
            total={filteredData.length}
            current={currentPage}
            pageSize={pageSize}
            onChange={handlePage}
          />
        </div>
      </div>
    </div>
  );
};

export default MySolutionsData;
