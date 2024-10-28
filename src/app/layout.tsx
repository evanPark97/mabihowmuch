import type { Metadata } from "next";
// import "./globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import Header from "@/components/header";

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
    <html lang="kr">
      <body>
        <ChakraProvider>
          <Header />
          {children}
        </ChakraProvider>
      </body>
      <footer></footer>
    </html>
  );
}
