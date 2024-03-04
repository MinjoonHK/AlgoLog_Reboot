"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function codeBlock(children: { value: React.ReactNode }) {
  return (
    <pre>
      <code>{children.value}</code>
    </pre>
  );
}

export default function MarkDown(props) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]}>{props.result}</ReactMarkdown>
  );
}
