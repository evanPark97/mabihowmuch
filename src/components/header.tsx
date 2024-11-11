"use client";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { ColorModeToggle } from "./color-mode-toggle";

const Header = () => {
  const route = useRouter();
  const path = usePathname();

  return (
    <Box padding={4} width="100%">
      <Flex gap={4} justifyContent="space-between" alignItems="center">
        <Link href={"/"}>
          <Text
            fontSize={{ mdDown: 14, md: 24 }}
            fontWeight={600}
            _hover={{
              textDecoration: "underline",
            }}
          >
            {path !== "/" && `지금 얼맙? ${process.env.NEXT_PUBLIC_VERSION}`}
          </Text>
        </Link>
        <Flex gap={2}>
          <Button
            variant={path === "/auction" ? "solid" : "outline"}
            size={{ smDown: "xs", sm: "md" }}
            onClick={() => route.push("/auction")}
          >
            경매장 검색
          </Button>
          <Button
            variant={path === "/store" ? "solid" : "outline"}
            size={{ smDown: "xs", sm: "md" }}
            onClick={() => route.push("/store")}
          >
            NPC 상점 검색
          </Button>
          {path !== "/update" ? (
            <Button
              variant="outline"
              colorPalette="green"
              size={{ smDown: "xs", sm: "md" }}
              onClick={() => route.push("/update")}
            >
              업데이트 노트
            </Button>
          ) : (
            <Button
              variant="outline"
              colorPalette="green"
              size={{ smDown: "xs", sm: "md" }}
              onClick={() => route.back()}
            >
              돌아가기
            </Button>
          )}
          <ColorModeToggle />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
