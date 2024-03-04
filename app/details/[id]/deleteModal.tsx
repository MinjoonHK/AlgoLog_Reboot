import { Modal } from "antd";
import { useState } from "react";

export default function DeleteModal({ isModalOpen }) {
  return (
    <div>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        //   onOk={handleOk}
        //   onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  );
}
