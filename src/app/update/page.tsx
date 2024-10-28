"use client";
import { useEffect, useState } from "react";
import { Flex, Box, Text, Card, CardBody, Divider } from "@chakra-ui/react";

const Update = () => {
  return (
    <Flex
      padding={[0, 20]}
      direction="column"
      gap={8}
      gridRowStart={2}
      justifyContent="center"
      alignItems="center"
      maxWidth={1280}
      margin="auto"
    >
      <Card flex={6}>
        <CardBody padding="10px 20px" borderWidth={1} borderRadius={8}>
          <Text marginBottom={4} fontSize={24} letterSpacing={1}>
            Update Note.
          
          </Text>

          <Text fontWeight={600} color="gray.500" marginBottom={1}>Beta 2.0 (Soon)</Text>
          <Text color="gray.500">각종 아이템 필터및 추가 기능 업데이트 예정입니다.</Text>
          <Text color="gray.500">최적화 진행</Text>

          <Divider marginY={6} />

          <Text fontWeight={600} marginBottom={1}>Beta 1.0</Text>
          <Text>베타 오픈</Text>
          <Text>현재 다양한 방향으로 최적화와 사용하기 편한 형태를 테스트 하고 있습니다!</Text>
          <Text>건의 사항이나 의견등 문의 내용은 하단 이메일로 전달해주세요!</Text>
        </CardBody>
      </Card>
    </Flex>
  );
};

export default Update;
