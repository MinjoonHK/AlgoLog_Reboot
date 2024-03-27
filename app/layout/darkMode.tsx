"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DarkMode() {
  let router = useRouter();
  const [mode, setMode] = useState<string>("");
  useEffect(() => {
    let cookieValue = ("; " + document.cookie)
      .split(`; mode=`)
      .pop()
      ?.split(";")[0];
    if (cookieValue == "") {
      document.cookie = "mode=light; max-age=" + 3600 * 24 * 400;
      setMode("light");
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
