"use client";

import { Button } from "antd";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

export default function SignOut() {
  let router = useRouter();
  const { data: session, status } = useSession();

  return (
    <div style={{ marginLeft: "10%" }}>
      {status === "authenticated" ? (
        <Button
          onClick={() => {
            signOut({ callbackUrl: "/auth/login" });
          }}
        >
          LOGOUT
        </Button>
      ) : (
        <Button
          onClick={() => {
            router.push("/auth/login");
          }}
        >
          LOGIN
        </Button>
      )}
    </div>
  );
}
