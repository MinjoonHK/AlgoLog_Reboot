import { CopyrightOutlined } from "@ant-design/icons";

export default function CustomFooter() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        Park Min Joon
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <CopyrightOutlined />
        2024 All rights reserved.
      </div>
    </div>
  );
}
