import type { Metadata } from "next";
import "./globals.css";
import { Flex } from "@chakra-ui/react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Provider from "./provider";

export const metadata: Metadata = {
  title: "지금 얼맙?",
  description: "마비노기 경매장 검색",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr" suppressHydrationWarning>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8613704714656621"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body>
        <Provider>
          <Flex
            direction="column"
            gridRowStart={2}
            justifyContent="center"
            alignItems="center"
            minH="100svh"
            width="100%"
            overflowX="hidden"
          >
            <Header />
            {children}
            <Footer />
          </Flex>
        </Provider>
      </body>
    </html>
  );
}
