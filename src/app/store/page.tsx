"use client";
import {
  INpcShopParams,
  INpcShopRequestParams,
  INpcShopResponse,
} from "@/interface/ncp-shop";
import { NPC_NAME, SERVER_NAME } from "@/utils/constant";
import NexonAPI from "@/utils/nexon-api";
import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Image,
  ListItem,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const Store = () => {
  const NEXON_API = new NexonAPI();
  const [params, setParams] = useState<INpcShopParams>({
    channel: 1,
  });
  const [shopData, setShopData] = useState<INpcShopResponse>();

  useEffect(() => {}, []);

  const handleNpcShopList = async () => {
    if (!params?.channel) return false;
    if (!params?.npc_name) return false;
    if (!params?.server_name) return false;

    const requestParams: INpcShopRequestParams = {
      channel: params.channel,
      npc_name: params.npc_name,
      server_name: params.server_name,
    };

    const response: INpcShopResponse = await NEXON_API.getNpcShopList(
      requestParams
    );
    setShopData(response);
  };

  const handleInputChange = (e: any) => {
    const { value, name } = e.target;
    setParams({
      ...params,
      [name]: value,
    });
  };

  const handleChannelValue = (value: string) => {
    setParams({ ...params, channel: Number(value) });
  };

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
      <Text marginBottom={4} fontSize={20} fontWeight={600}>
        NPC 상점 검색
      </Text>
      <Flex gap={4}>
        <Box>
          <Card width="xl">
            <CardBody>
              <Box>
                <Text marginBottom={4} fontSize={18} fontWeight={600}>
                  확인사항!
                </Text>
                <UnorderedList>
                  <ListItem>
                    마비노기의 게임 데이터는 평균 10분 후 확인 가능합니다.
                  </ListItem>
                  <ListItem>
                    마비노기의 상점 정보는 36분마다 변경됩니다.
                  </ListItem>
                  <ListItem>
                    현재 일부 NPC 대상으로 상점 정보가 공개되며, 추후 제공되는
                    NPC가 추가될 수 있습니다.
                  </ListItem>
                  <ListItem>
                    반짝이는 색상의 코드 정보는 제공되지 않습니다.
                  </ListItem>
                </UnorderedList>
              </Box>
            </CardBody>
          </Card>
          <Card width="xl">
            <CardBody>
              <Flex direction="column" gap={4}>
                <Select
                  placeholder="서버"
                  name="server_name"
                  onChange={handleInputChange}
                >
                  {SERVER_NAME.map((server, index) => (
                    <option key={index} value={server}>
                      {server}
                    </option>
                  ))}
                </Select>
                <Select
                  placeholder="NPC"
                  name="npc_name"
                  onChange={handleInputChange}
                >
                  {NPC_NAME.map((npc, index) => (
                    <option key={index} value={npc}>
                      {npc}
                    </option>
                  ))}
                </Select>
                <NumberInput
                  size="md"
                  maxW={24}
                  defaultValue={1}
                  min={1}
                  max={15}
                  name="channel"
                  onChange={handleChannelValue}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <Button colorScheme="green" onClick={() => handleNpcShopList()}>
                  검색
                </Button>
              </Flex>
            </CardBody>
          </Card>
        </Box>
        <Box>
          {shopData && (
            <Card width="xl">
              <CardBody>
                <Flex direction="column" gap={4}>
                  {shopData.shop.map((tab, index) => (
                    <Box key={index} border="1px solid #FFF">
                      <Text>{tab.tab_name}</Text>
                      {tab.item &&
                        tab.item.map((item, index) => (
                          <Flex key={index} border="1px solid #FFF">
                            <Text>{item.item_display_name}</Text>
                            <Image src={item.image_url} objectFit="contain" />
                            <Flex>
                              {item.item_option.map((option, index) => (
                                <Box key={index}>
                                  <Text>{option.option_desc}</Text>
                                  <Text>{option.option_sub_type}</Text>
                                  <Text>{option.option_type}</Text>
                                  <Text>{option.option_value}</Text>
                                  <Text>{option.option_value2}</Text>
                                </Box>
                              ))}
                            </Flex>
                            <Box>
                              {item.price.map((price, index) => (
                                <Text key={index}>
                                  {price.price_type} | {price.price_value}
                                </Text>
                              ))}
                            </Box>
                          </Flex>
                        ))}
                    </Box>
                  ))}
                </Flex>
              </CardBody>
            </Card>
          )}
        </Box>
      </Flex>
    </Flex>
  );
};

export default Store;
