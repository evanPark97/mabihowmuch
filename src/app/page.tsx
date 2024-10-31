"use client";
import { Box, Button, Card, CardBody, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import Caution from "@/components/caution";

export default function Home() {
  const route = useRouter();
  return (
    <Flex
      padding={[0, 20]}
      direction="column"
      gap={8}
      gridRowStart={2}
      justifyContent="center"
      alignItems="center"
      minH="100svh"
    >
      <Text fontSize={20} fontWeight={600} textAlign="center" letterSpacing={6}>
        지금얼맙?
      </Text>
      <Box boxSize="xl">
        <Caution />
        <Card width="xl" marginTop={8}>
          <CardBody>
            <Flex direction="column" gap={4}>
              <Button colorScheme="green" onClick={() => alert("페이지 준비중입니다!")}>
                NPC 상점 검색
              </Button>
              <Button colorScheme="green" onClick={() => route.push("auction")}>
                경매장 검색
              </Button>
            </Flex>
          </CardBody>
        </Card>
      </Box>
    </Flex>
  );
}
