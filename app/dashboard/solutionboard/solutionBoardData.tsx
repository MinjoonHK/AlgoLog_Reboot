"use client";

import { Card, Pagination, Spin } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import Search, { SearchProps } from "antd/es/input/Search";
import Link from "next/link";
import Meta from "antd/es/card/Meta";
import { HeartFilled, HeartOutlined, MessageOutlined } from "@ant-design/icons";

interface dataType {
  _id: string;
  title: string;
  content: string;
  image: string;
  author: string;
  CreatedAt: Date;
}

const SolutionBoardData = () => {
  const [postItems, setPostItems] = useState<dataType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchedItems, setSearchedItems] = useState<dataType[]>([]);
  const [heartClicked, setHeartClicked] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  const fetchData = async () => {
    axios.get("/api/publicpost").then((response) => {
      setPostItems(response.data);
      setSearchedItems(response.data);
    });
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
    setLoading(false);
  }, []);

  const onSearch: SearchProps["onSearch"] = (value, _e) => {
    if (value === "") {
      setSearchedItems(postItems);
    } else {
      const filteredData = postItems.filter((item) => {
        return item.title.includes(value);
      });
      setSearchedItems(filteredData);
    }
  };

  const handlePage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div style={{ padding: "2% 15%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Search
            size="large"
            style={{ width: "50%", color: "#1677ff" }}
            placeholder="문제 검색하기"
            onSearch={onSearch}
          />
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
            {searchedItems
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
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Pagination
            total={searchedItems.length}
            current={currentPage}
            pageSize={pageSize}
            onChange={handlePage}
          />
        </div>
      </div>
    </div>
  );
};

export default SolutionBoardData;
