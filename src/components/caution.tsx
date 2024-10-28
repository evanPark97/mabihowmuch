import {
  Box,
  UnorderedList,
  ListItem,
  Text,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

const Caution = () => {
  return (
    <Box width="100%">
      <Alert
        status="info"
        alignItems="flex-start"
        variant="subtle"
        borderRadius={8}
      >
        <AlertIcon />
        <Box>
          <Text marginBottom={4} fontSize={18} fontWeight={600}>
            확인사항!
          </Text>
          <UnorderedList>
            <ListItem>
              마비노기의 게임 데이터는 평균 10분 후 확인 가능합니다.
            </ListItem>
            <ListItem>마비노기의 상점 정보는 36분마다 변경됩니다.</ListItem>
            <ListItem>
              현재 일부 NPC 대상으로 상점 정보가 공개되며, 추후 제공되는 NPC가
              추가될 수 있습니다.
            </ListItem>
            <ListItem>반짝이는 색상의 코드 정보는 제공되지 않습니다.</ListItem>
          </UnorderedList>
        </Box>
      </Alert>
    </Box>
  );
};

export default Caution;
