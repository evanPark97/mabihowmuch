"use client"
import { useEffect, useState } from "react";
import { Flex, Box, Text, Card, CardBody } from "@chakra-ui/react";

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
        </CardBody>
      </Card>
    </Flex>
  );
};

export default Update;