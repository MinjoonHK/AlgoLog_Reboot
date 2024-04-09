"use client";

import { SessionProvider } from "next-auth/react";
import { Provider as ReduxProvider } from "react-redux";
import React, { ReactNode } from "react";
import { store } from "@/lib/Redux/store";

interface Props {
  children: ReactNode;
}
function Providers({ children }: Props) {
  return (
    <ReduxProvider store={store}>
      <SessionProvider>{children}</SessionProvider>
    </ReduxProvider>
  );
}

export default Providers;
