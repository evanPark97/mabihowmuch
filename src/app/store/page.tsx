"use client";
import Caution from "@/components/caution";
import { ShopItem } from "@/components/item";
import { OptionRenderer } from "@/components/item-option";
import { Checkbox } from "@/components/ui/checkbox";
import { NumberInputField } from "@/components/ui/number-input";
import { toaster, Toaster } from "@/components/ui/toaster";
import {
  INpcShopParams,
  INpcShopRequestParams,
  INpcShopResponse,
} from "@/interface/ncp-shop";
import { useOptionFlagStore } from "@/stores/useOptionFlagStore";
import { NPC_NAME, SERVER_NAME } from "@/utils/constant";
import NexonAPI from "@/utils/nexon-api";
import {
  Box,
  Button,
  Card,
  CardBody,
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  Flex,
  NativeSelectField,
  NativeSelectRoot,
  NumberInputRoot,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";

const Store = () => {
  const NEXON_API = new NexonAPI();
  const { optionFlag, toggleOptionFlag } = useOptionFlagStore();
  const [params, setParams] = useState<INpcShopParams>({
    channel: 1,
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shopData, setShopData] = useState<INpcShopResponse>();
  const [defaultTab, setDefaultTab] = useState("");

  useEffect(() => {
    if (shopData) {
      setDefaultTab(shopData.shop[0].tab_name);
    }
  }, [shopData]);

  const handleNpcShopList = async () => {
    setLoading(true);
    try {
      if (!params?.server_name) throw new Error("조회할 서버를 선택해주세요.");
      if (!params?.npc_name) throw new Error("조회할 NPC를 선택해주세요.");
      if (!params?.channel) throw new Error("채널이 선택되지 않았습니다.");

      const requestParams: INpcShopRequestParams = {
        channel: params.channel,
        npc_name: params.npc_name,
        server_name: params.server_name,
      };

      const response: INpcShopResponse = await NEXON_API.getNpcShopList(
        requestParams
      );
      setShopData(response);
    } catch (error: any) {
      console.log(error);
      if (error?.status == 400) {
        toaster.create({
          type: "error",
          title: "검색 실패",
          description: "아이템 목록을 불러오는데 실패하였습니다. 서버 또는 채널을 변경 후 다시 조회해주세요.",
        });
      } else {
        toaster.create({
          type: "error",
          title: "검색 실패",
          description: error.message,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = e.target;
    setParams({
      ...params,
      [name]: value,
    });
  };

  const handleOptionFlag = () => {
    toggleOptionFlag();
  };

  return (
    <Flex
      padding={{ smDown: 2, smToXl: 6 }}
      direction="column"
      gap={4}
      justifyContent="center"
      alignItems="center"
      width="100vw"
      maxW={960}
      flex={1}
    >
      <Toaster />
      <Caution />
      <DialogRoot
        lazyMount
        open={openDialog}
        size={{ mdDown: "md", md: "lg" }}
        motionPreset="slide-in-bottom"
        scrollBehavior="inside"
      >
        <DialogContent
          position="fixed"
          zIndex={100}
          width="90%"
          left={{ smDown: 0, smToMd: 0 }}
          right={{ smDown: 0, smToMd: 0 }}
          top={{ mdDown: 0, md: 0 }}
          bottom={{ mdDown: 0, md: 0 }}
          padding={1}
        >
          <DialogHeader>
            <DialogTitle>
              채널 선택 (현재 채널 {params.channel} 채널)
            </DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Flex flexDirection="column" gap={4}>
              {Array.from({ length: 15 }, (_, i) => (
                <Button
                  key={i + 1}
                  colorPalette={params.channel === i + 1 ? "blue" : "gray"}
                  onClick={() => {
                    setParams({ ...params, channel: i + 1 });
                    setOpenDialog(false);
                  }}
                >
                  {i + 1} 채널
                </Button>
              ))}
            </Flex>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="solid" onClick={() => setOpenDialog(false)}>
                닫기
              </Button>
            </DialogActionTrigger>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
      <Flex direction="column" gap={4} width="100%">
        <Box flex={1}>
          <Card.Root>
            <CardBody>
              <Text marginBottom={4} fontSize={20} fontWeight={600}>
                NPC 상점 검색
              </Text>
              <Flex direction="column" gap={4}>
                <NativeSelectRoot>
                  <NativeSelectField
                    placeholder="서버"
                    name="server_name"
                    onChange={handleInputChange}
                  >
                    {SERVER_NAME.map((server, index) => (
                      <option key={index} value={server}>
                        {server}
                      </option>
                    ))}
                  </NativeSelectField>
                </NativeSelectRoot>
                <NativeSelectRoot>
                  <NativeSelectField
                    placeholder="NPC"
                    name="npc_name"
                    onChange={handleInputChange}
                  >
                    {NPC_NAME.map((npc, index) => (
                      <option key={index} value={npc}>
                        {npc}
                      </option>
                    ))}
                  </NativeSelectField>
                </NativeSelectRoot>
                <Box>
                  <Button onClick={() => setOpenDialog(true)}>
                    채널 선택 (현재 채널: {params.channel})
                  </Button>
                </Box>
                <Flex
                  justifyContent="space-between"
                  alignItems="center"
                  gap={4}
                >
                  <Checkbox checked={optionFlag} onChange={handleOptionFlag}>
                    아이템 옵션 같이보기
                  </Checkbox>
                </Flex>
                <Button
                  colorPalette="green"
                  onClick={() => handleNpcShopList()}
                >
                  검색
                </Button>
              </Flex>
            </CardBody>
          </Card.Root>
        </Box>
        <Box>
          {shopData && (
            <Card.Root>
              <CardBody>
                <Flex direction="column" gap={4}>
                  <Tabs.Root
                    variant="subtle"
                    value={defaultTab}
                    onValueChange={(e) => setDefaultTab(e.value)}
                  >
                    {shopData.shop.map((tab, index) => (
                      <Tabs.List>
                        <Tabs.Trigger value={tab.tab_name}>
                          {tab.tab_name}
                        </Tabs.Trigger>
                      </Tabs.List>
                    ))}
                    {shopData.shop.map((tab, index) => (
                      <Tabs.Content value={tab.tab_name}>
                        <Flex gap={4} flexDirection="column">
                          {tab.item &&
                            tab.item.map((item, index) => (
                              <ShopItem
                                key={index}
                                item={item}
                                loading={loading}
                              />
                            ))}
                        </Flex>
                      </Tabs.Content>
                    ))}
                  </Tabs.Root>
                </Flex>
              </CardBody>
            </Card.Root>
          )}
        </Box>
      </Flex>
    </Flex>
  );
};

export default Store;
