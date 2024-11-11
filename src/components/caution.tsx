import { Box, List } from "@chakra-ui/react";
import { Alert } from "./ui/alert";
import { useState } from "react";
import { CloseButton } from "./ui/close-button";

const Caution = () => {
  const [hide, setHide] = useState(false);

  if (hide) {
    return null;
  } else {
    return (
      <Box width="100%">
        <Alert status="info" title="확인사항!">
          <CloseButton position="absolute" right={0} top={0} onClick={() => setHide(true)} />
          <List.Root fontSize={{ smDown: "xs", sm: "sm" }}>
            <List.Item>
              마비노기의 게임 데이터는 평균 10분 후 확인 가능합니다.
            </List.Item>
            <List.Item>마비노기의 상점 정보는 36분마다 변경됩니다.</List.Item>
            <List.Item>
              현재 일부 NPC 대상으로 상점 정보가 공개되며, 추후 제공되는 NPC가
              추가될 수 있습니다.
            </List.Item>
            <List.Item>
              반짝이는 색상의 코드 정보는 제공되지 않습니다.
            </List.Item>
          </List.Root>
        </Alert>
      </Box>
    );
  }
};

export default Caution;
