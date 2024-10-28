"use client";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useRouter, usePathname } from "next/navigation";
import DarkModeToggle from "./darkmode-toggle";

const Header = () => {
  const route = useRouter();
  const path = usePathname();

  if (path === "/") return null;

  return (
    <Box padding={4}>
      <Flex gap={4} justifyContent="space-between" alignItems="center">
        <Text fontSize={24} fontWeight={600}>
          지금 얼맙? (Beta 1.0)
        </Text>
        <Flex gap={2}>
          {path !== "/update" ? (
            <Button
              variant="outline"
              colorScheme="green"
              onClick={() => route.push("/update")}
            >
              업데이트 노트
            </Button>
          ) : (
            <Button
              variant="outline"
              colorScheme="green"
              onClick={() => route.push("/auction")}
            >
              경매장 검색
            </Button>
          )}
          <DarkModeToggle />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
