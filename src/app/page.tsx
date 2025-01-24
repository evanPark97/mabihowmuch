"use client";
import { Box, Button, Card, CardBody, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import Caution from "@/components/caution";
import Ad from "@/components/kakao-ad";
import { kakaoAdUnit } from "@/utils/constant";

export default function Home() {
  const route = useRouter();
  return (
    <>
      <Ad
        desktopAdUnit={kakaoAdUnit.pc}
        mobileAdUnit={kakaoAdUnit.mobile}
        adWidthDesktop="728"
        adHeightDesktop="90"
        adWidthMobile="320"
        adHeightMobile="100"
      />
      <Flex
        padding={[0, 20]}
        direction="column"
        gap={4}
        justifyContent="center"
        alignItems="center"
        flex={1}
      >
        <Text
          fontSize={24}
          fontWeight={600}
          textAlign="center"
          letterSpacing={6}
        >
          지금얼맙?
        </Text>
        <Card.Root marginTop={4}>
          <CardBody>
            <Caution />
            <Box marginTop={6}>
              <Flex direction="column" gap={4}>
                <Button
                  colorPalette="green"
                  onClick={() => route.push("auction")}
                >
                  경매장 검색
                </Button>
                <Button
                  colorPalette="green"
                  onClick={() => route.push("store")}
                >
                  NPC 상점 검색
                </Button>
              </Flex>
            </Box>
          </CardBody>
        </Card.Root>
      </Flex>
    </>
  );
}
