import { Alert } from "@/components/ui/alert";
import { TimelineTitle } from "@/components/ui/timeline";
import {
  Flex,
  Text,
  Card,
  CardBody,
  Badge,
  TimelineContent,
  TimelineItem,
  TimelineRoot,
} from "@chakra-ui/react";

const Update = () => {
  return (
    <Flex
      padding={[0, 20]}
      direction="column"
      gap={4}
      gridRowStart={2}
      justifyContent="center"
      maxWidth={1280}
      margin="auto"
    >
      <Alert flex={1}>
        <Text>
          현재 다양한 방향으로 최적화와 사용하기 편한 형태를 테스트 하고
          있습니다!
        </Text>
        <Text>
          건의 사항이나 의견등 문의 내용은 하단 이메일로 전달해주세요!
        </Text>
      </Alert>
      <Card.Root flex={1}>
        <CardBody padding="10px 20px" borderWidth={1} borderRadius={8}>
          <Text marginBottom={4} fontSize={24} letterSpacing={1}>
            Update Note.
          </Text>
          <TimelineRoot variant="outline">
            <TimelineItem>
              <TimelineTitle whiteSpace="nowrap">2024.11.01</TimelineTitle>
              <TimelineContent textStyle="xs">
                <TimelineTitle>
                  <Badge>Beta 1.1</Badge>
                  최적화 및 옵션 표기 여부 선택 추가
                </TimelineTitle>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineTitle whiteSpace="nowrap">2024.10.31</TimelineTitle>
              <TimelineContent textStyle="xs">
                <TimelineTitle>
                  <Badge>Beta 1.0</Badge>
                  경매장 검색 베타 버전 오픈
                </TimelineTitle>
              </TimelineContent>
            </TimelineItem>
          </TimelineRoot>
        </CardBody>
      </Card.Root>
    </Flex>
  );
};

export default Update;
