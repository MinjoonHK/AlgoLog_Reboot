import React from "react";
import { Inter } from "next/font/google";
import StyledComponentsRegistry from "../lib/AntdRegistry";
import "./globals.css";
import Navbar from "./layout/navbar";
import { cookies } from "next/headers";
import "./layout/darkMode.css";

import CustomFooter from "./layout/footer";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AlgoLog",
  description: "Save your daily algorithm solutions!",
  icons: {
    icon: "/img/algoIcon.png",
  },
};

const RootLayout = async ({ children }: React.PropsWithChildren) => {
  let mode = cookies().get("mode");
  return (
    <html>
      <body suppressHydrationWarning={true} className={inter.className}>
        <Providers>
          <StyledComponentsRegistry>
            <Navbar />
            <div
              className={
                mode != undefined && mode.value == "dark"
                  ? "mainBackgroundDark"
                  : "mainBackgroundLight"
              }
            >
              {children}
            </div>
            <footer
              className={
                mode != undefined && mode.value == "dark"
                  ? "footerBackGroundDark"
                  : "footerBackGroundLight"
              }
            >
              <CustomFooter />
            </footer>
          </StyledComponentsRegistry>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
