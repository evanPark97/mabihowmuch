import type { Metadata } from "next";
import "./globals.css";
import { Box, Flex } from "@chakra-ui/react";
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
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <script
          type="text/javascript"
          src="//t1.daumcdn.net/kas/static/ba.min.js"
          async
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
            <Box display={{ smDown: "none" }}>
              <ins
                className="kakao_ad_area"
                style={{ display: "none" }}
                data-ad-unit="DAN-1mWBnwJylVOc65dJ"
                data-ad-width="728"
                data-ad-height="90"
              ></ins>
            </Box>
            <Box display={{ md: "none" }}>
              <ins
                className="kakao_ad_area"
                style={{ display: "none" }}
                data-ad-unit="DAN-FC10E5ShhUx5NP6X"
                data-ad-width="320"
                data-ad-height="100"
              ></ins>
            </Box>
            <Box paddingY={4} paddingX={2} flex={1}>
              {children}
            </Box>
            <Footer />
          </Flex>
        </Provider>
      </body>
    </html>
  );
}
