"use client";

import { Button, Card, Dropdown, MenuProps, Space, Spin } from "antd";
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

interface dataType {
  _id: string;
  title: string;
  content: string;
  image: string;
  author: string;
  CreatedAt: Date;
}

const items = [
  {
    label: "백준",
    key: "1",
  },
  {
    label: "프로그래머스",
    key: "2",
  },
  {
    label: "LeetCode",
    key: "3",
  },
  {
    label: "SWEA",
    key: "4",
  },
  {
    label: "SOFTEER",
    key: "5",
  },
];

const MySolutionsData = () => {
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
  const [dropdownSelected, setDropdownSelected] = useState("출처 분류");
  const [filteredData, setFilteredData] = useState<dataType[]>([]);

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

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    const selectedItem = items[Number(e.key) - 1];
    if (selectedItem) {
      setDropdownSelected(selectedItem.label);
    }
    const filteredData = postItems.filter((item) => {
      return item.title.includes(dropdownSelected);
    });
    setFilteredData(filteredData);
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
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
              <Dropdown menu={menuProps}>
                <Button>
                  <Space>
                    {dropdownSelected}
                    <DownOutlined />
                  </Space>
                </Button>
              </Dropdown>

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
            {filteredData.map((item, idx) => {
              return (
                <div key={idx} style={{ margin: "25px", textAlign: "center" }}>
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
                          <span style={{ fontSize: "23px" }}>
                            {heartClicked ? (
                              <span>
                                <HeartFilled
                                  style={{ color: "red" }}
                                  onClick={() => {
                                    setHeartClicked(false);
                                  }}
                                />
                                <MessageOutlined
                                  style={{ marginLeft: "10px" }}
                                />
                              </span>
                            ) : (
                              <span>
                                <HeartOutlined
                                  onClick={() => {
                                    setHeartClicked(true);
                                  }}
                                />
                                <MessageOutlined
                                  style={{ marginLeft: "10px" }}
                                />
                              </span>
                            )}
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
      </div>
    </div>
  );
};

export default MySolutionsData;
