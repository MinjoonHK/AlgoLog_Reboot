"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DarkMode() {
  let router = useRouter();
  const [mode, setMode] = useState<string>("");
  useEffect(() => {
    if (document.cookie) {
      let cookieValue = ("; " + document.cookie)
        .split(`; mode=`)
        .pop()
        ?.split(";")[0];
      setMode(cookieValue || "");
    } else {
      setMode("light");
      document.cookie = "mode=light; max-age=" + 3600 * 24 * 400;
    }
  }, []);
  return (
    <div
      onClick={() => {
        let cookieValue = ("; " + document.cookie)
          .split(`; mode=`)
          .pop()
          ?.split(";")[0];
        if (cookieValue == "light") {
          document.cookie = "mode=dark; max-age=" + 3600 * 24 * 400;
          setMode("dark");
          router.refresh();
        } else if (cookieValue == "dark") {
          document.cookie = "mode=light; max-age=" + 3600 * 24 * 400;
          setMode("light");
          router.refresh();
        }
      }}
      style={{ marginLeft: "10px", cursor: "pointer" }}
    >
      {mode == "light" ? "🌙" : "🌞"}
    </div>
  );
}
