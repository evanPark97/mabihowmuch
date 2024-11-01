"use client";
import AuctionCategory from "@/components/auction-category";
import Caution from "@/components/caution";
import { AuctionItem } from "@/components/item";
import Pagination from "@/components/pagination";
import { Alert } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import {
  IAuctionRequestParams,
  IAuctionResponse,
  Item,
} from "@/interface/auction-list";
import { useOptionFlagStore } from "@/stores/useOptionFlagStore";
import NexonAPI from "@/utils/nexon-api";
import {
  Flex,
  Card,
  CardBody,
  Box,
  Badge,
  Input,
  Button,
  Text,
  Show,
  DrawerActionTrigger,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "@chakra-ui/react";
import { Toaster, toaster } from "@/components/ui/toaster";
import { useEffect, useState } from "react";

const Auction = () => {
  const NEXON_API = new NexonAPI();
  const { optionFlag, toggleOptionFlag } = useOptionFlagStore();
  const [params, setParams] = useState<IAuctionRequestParams>({});

  const [loading, setLoading] = useState(false);
  const [auctionData, setAuctionData] = useState<Item[]>([]);
  // Pagination
  const [pagenationAuctionData, setPagenationAuctionData] = useState<Item[]>(
    []
  );
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  useEffect(() => {
    setPage(1);
  }, []);

  const handleAuctionSearch = async () => {
    setLoading(true);
    try {
      const response: IAuctionResponse = await NEXON_API.getAuctionSearch(
        params
      );
      setParams({ ...params, cursor: response.next_cursor });
      setAuctionData(response.auction_item);
      auctionItemListPagenator();
    } catch (error: any) {
      if (error?.status == 400) {
        toaster.create({
          type: "error",
          title: "검색 실패",
          description: "경매장에서 아이템 목록을 불러오는데 실패하였습니다.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const appendAuctionItemList = async () => {
    setLoading(true);
    try {
      if (params?.cursor === null) {
        return false;
      }

      const response: IAuctionResponse = await NEXON_API.getAuctionSearch(
        params
      );
      setParams({ ...params, cursor: response.next_cursor });
      setAuctionData(auctionData?.concat(response.auction_item));
      auctionItemListPagenator();
    } catch (error: any) {
      if (error?.status == 400) {
        toaster.create({
          type: "error",
          title: "검색 실패",
          description: "경매장에서 아이템 목록을 불러오는데 실패하였습니다.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    auctionItemListPagenator();
  }, [page, auctionData]);

  const auctionItemListPagenator = () => {
    if (auctionData) {
      const pagenationList = auctionData.slice(
        (page - 1) * pageSize,
        page * pageSize
      );
      setPagenationAuctionData(pagenationList);
    }
  };

  const totalPages = auctionData ? Math.ceil(auctionData.length / pageSize) : 0;
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      if (totalPages - newPage <= 1) {
        appendAuctionItemList();
      }
      setPage(newPage);
    }
  };

  const handleInputChange = (e: any) => {
    const { value, name } = e.target;
    if (value) {
      setParams({
        ...params,
        [name]: value,
      });
    }
  };

  const handleSelectCategory = (category: string) => {
    setParams({ ...params, auction_item_category: category });
  };

  const handleOptionFlag = () => {
    toggleOptionFlag();
  };

  const handleReset = () => {
    window.location.reload();
  };

  return (
    <Flex
      padding={{ smDown: 2, smToXl: 6 }}
      direction="column"
      gap={4}
      justifyContent="center"
      alignItems="center"
      width="100vw"
      maxW={1920}
      flex={1}
    >
      <Toaster />
      <Caution />
      <Flex direction="column" gap={4} width="100%">
        <Alert
          status="info"
          borderRadius={8}
          title={`카테고리와 검색어 중 우선 적용된 사항 한 가지만 검색에 적용됩니다. 다른 조건으로 검색하려면 초기화 후 검색을 진행해주세요!`}
          fontSize={{ smDown: 'xs', sm: 'sm' }}
        />
        <Card.Root>
          <CardBody borderWidth={1} borderRadius={8}>
            <Flex flexDirection="column" gap={4}>
              <Flex flex={1} gap={2} alignItems="center">
                <Box>
                  <Text fontSize={20} fontWeight={600}>
                    경매장 검색
                  </Text>
                </Box>
                {params?.auction_item_category && (
                  <Badge variant="subtle" colorPalette="green" fontSize={14}>
                    {params.auction_item_category}
                  </Badge>
                )}
              </Flex>
              <Box flex={1}>
                <Input
                  variant="subtle"
                  name="item_name"
                  placeholder="검색"
                  value={params.item_name}
                  onChange={handleInputChange}
                />
              </Box>
              <Flex gap={4} justifyContent="flex-end">
                <Button
                  width={150}
                  colorScheme="green"
                  size={{ smDown: 'xs', sm: 'sm' }}
                  onClick={() => handleAuctionSearch()}
                >
                  검색
                </Button>
                <Button
                  width={100}
                  colorScheme="gray"
                  size={{ smDown: 'xs', sm: 'sm' }}
                  onClick={() => handleReset()}
                >
                  초기화
                </Button>
              </Flex>
            </Flex>
          </CardBody>
        </Card.Root>
        <Card.Root>
          <CardBody borderWidth={1} borderRadius={8}>
            <Flex justifyContent="space-between" alignItems="center" gap={4}>
              <Checkbox checked={optionFlag} onChange={handleOptionFlag}>
                아이템 옵션 같이보기
              </Checkbox>
            </Flex>
            {/* <Flex gap={4} marginTop={4}>
              <NativeSelectRoot>
                <NativeSelectField placeholder="에르그" name="ergue">
                  <option value="">전체</option>
                  <option value="B">B</option>
                  <option value="A">A</option>
                  <option value="S">S</option>
                </NativeSelectField>
              </NativeSelectRoot>
              <NativeSelectRoot>
                <NativeSelectField placeholder="세공 랭크" name="rank">
                  <option value="">전체</option>
                  <option value="3">3</option>
                  <option value="2">2</option>
                  <option value="1">1</option>
                </NativeSelectField>
              </NativeSelectRoot>
              <Field.Root orientation="horizontal">
                <Field.Label>세공 옵션</Field.Label>
                <Input placeholder="세공 옵션" flex="1" />
              </Field.Root>
            </Flex> */}
          </CardBody>
        </Card.Root>
        <Box display={{ lg: 'none' }}>
          <DrawerRoot placement="start">
            <DrawerBackdrop />
            <DrawerTrigger asChild>
              <Button variant="outline" size="sm" width="full">
                카테고리
              </Button>
            </DrawerTrigger>
            <DrawerContent position="fixed" top={0} left={0} bottom={0}>
              <DrawerHeader>
                <DrawerTitle>카테고리</DrawerTitle>
              </DrawerHeader>
              <DrawerBody>
                <AuctionCategory onSelectItem={handleSelectCategory} />
              </DrawerBody>
              <DrawerFooter>
                <DrawerActionTrigger asChild>
                  <Button variant="outline">닫기</Button>
                </DrawerActionTrigger>
              </DrawerFooter>
              <DrawerCloseTrigger />
            </DrawerContent>
          </DrawerRoot>
        </Box>
        <Flex gap={4}>
          <Card.Root flex={1} minW={200} display={{ lgDown: 'none' }}>
            <CardBody borderWidth={1}>
              <AuctionCategory onSelectItem={handleSelectCategory} />
            </CardBody>
          </Card.Root>
          <Card.Root flex={6}>
            <CardBody padding="10px 20px" borderWidth={1} borderRadius={8}>
              {pagenationAuctionData.length > 0 ? (
                <>
                  <Pagination
                    page={page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                  <Flex direction="column" gap={4}>
                    {pagenationAuctionData.map((item, index) => (
                      <AuctionItem key={index} item={item} loading={loading} />
                    ))}
                  </Flex>
                  <Pagination
                    page={page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </>
              ) : (
                <Flex justifyContent="center" align="center" height="100%">
                  조회된 내용이 없습니다!
                </Flex>
              )}
            </CardBody>
          </Card.Root>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Auction;
