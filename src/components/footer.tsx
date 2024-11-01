import { Box, Flex, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box padding={6} textAlign="center">
      <Flex gap={1} justifyContent="center">
        <Text>해당 사이트는</Text>
        <Text textDecoration="underline">
          <a href="https://openapi.nexon.com/" target="_blank">
            Next Open Api
          </a>
        </Text>
        <Text>를 사용하여 제작되었습니다.</Text>
      </Flex>
      <Text>
        마비옛체 서체의 지적 재산권을 포함한 모든 권리는 ㈜넥슨코리아에
        있습니다.
      </Text>
      <Text color="gray.500">email: evan_Park@outlook.com</Text>
    </Box>
  );
};

export default Footer;
