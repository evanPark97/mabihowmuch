"use client";
import AuctionCategory from "@/components/auction-category";
import Caution from "@/components/caution";
import { AuctionItem } from "@/components/item";
import Pagination from "@/components/pagination";
import {
  IAuctionRequestParams,
  IAuctionResponse,
  Item,
} from "@/interface/auction-list";
import NexonAPI from "@/utils/nexon-api";
import {
  Alert,
  AlertIcon,
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  Checkbox,
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const Store = () => {
  const NEXON_API = new NexonAPI();
  const [params, setParams] = useState<IAuctionRequestParams>({});

  const [loading, setLoading] = useState(false);
  // Fillter
  const [optionFlag, setOptionFlag] = useState(false);

  const [auctionData, setAuctionData] = useState<Item[]>([]);
  // Pagination
  const [pagenationAuctionData, setPagenationAuctionData] = useState<Item[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  useEffect(() => {
    setPage(1);
  }, []);

  /**
   *
   */
  const handleAuctionSearch = async () => {
    setLoading(true);
    try {
      const response: IAuctionResponse = await NEXON_API.getAuctionSearch(
        params
      );
      setParams({ ...params, cursor: response.next_cursor });
      setAuctionData(response.auction_item);
      auctionItemListPagenator();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  /**
   *
   * @returns
   */
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
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    auctionItemListPagenator();
  }, [page, auctionData]);

  /**
   *
   */
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
  /**
   *
   * @param newPage
   */
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      if (totalPages - newPage <= 1) {
        appendAuctionItemList();
      }
      setPage(newPage);
    }
  };

  /**
   *
   * @param e
   */
  const handleInputChange = (e: any) => {
    const { value, name } = e.target;
    if (value) {
      setParams({
        ...params,
        [name]: value,
      });
    }
  };

  /**
   *
   * @param category
   */
  const handleSelectCategory = (category: string) => {
    setParams({ ...params, auction_item_category: category });
  };

  /**
   *
   * @param e
   */
  const handleOptionFlag = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value === "on") {
      setOptionFlag(true);
    } else {
      setOptionFlag(false);
    }
  };

  /**
   * 
   */
  const handleReset = () => {
    setParams({})
    setAuctionData([])
    setPagenationAuctionData([])
    setPage(1)
  }

  return (
    <Flex
      padding={[0, 20]}
      direction="column"
      gap={8}
      gridRowStart={2}
      justifyContent="center"
      alignItems="center"
      maxWidth={1280}
      minH="100svh"
      margin="auto"
    >
      <Caution />
      <Flex direction="column" gap={4} width="100%">
        <Alert status="info" borderRadius={8}>
          <AlertIcon />
          <Text>카테고리와 검색어 중 우선 적용된 사항 한 가지만 검색에 적용됩니다!</Text>
        </Alert>
        <Card>
          <CardBody borderWidth={1} borderRadius={8}>
            <Flex justifyContent="space-between" alignItems="center" gap={4}>
              <Flex flex={1} gap={2} alignItems="center" maxW={180}>
                <Box>
                  <Text fontSize={20} fontWeight={600}>
                    경매장 검색
                  </Text>
                </Box>
                <Badge variant="subtle" colorScheme="teal" fontSize={18}>
                  {params?.auction_item_category}
                </Badge>
              </Flex>
              <Box flex={1}>
                <Input
                  variant="filled"
                  name="item_name"
                  placeholder="검색"
                  defaultValue={params.item_name}
                  onChange={handleInputChange}
                />
              </Box>
              <Flex gap={4}>
                <Button
                  width={150}
                  colorScheme="green"
                  onClick={() => handleAuctionSearch()}
                >
                  검색
                </Button>
                <Button
                  width={100}
                  colorScheme="gray"
                  onClick={() => handleReset()}
                >
                  초기화
                </Button>
              </Flex>
            </Flex>
          </CardBody>
        </Card>
        {/* <Card>
          <CardBody borderWidth={1} borderRadius={8}>
            <Flex justifyContent="space-between" alignItems="center" gap={4}>
              <Checkbox defaultChecked={optionFlag} onChange={handleOptionFlag}>
                아이템 옵션 같이보기
              </Checkbox>
            </Flex>
            <Flex gap={4} marginTop={4}>
              <InputGroup>
                <InputLeftAddon>에르그</InputLeftAddon>
                <Select>
                  <option value="">전체</option>
                  <option value="B">B</option>
                  <option value="A">A</option>
                  <option value="S">S</option>
                </Select>
                <Input type="number" max={50} />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon>세공 랭크</InputLeftAddon>
                <Select>
                  <option value="">전체</option>
                  <option value="3">3</option>
                  <option value="2">2</option>
                  <option value="1">1</option>
                </Select>
              </InputGroup>
              <InputGroup>
                <InputLeftAddon>세공 옵션</InputLeftAddon>
                <Input type="text" />
              </InputGroup>
            </Flex>
          </CardBody>
        </Card> */}
        <Flex gap={4}>
          <Card flex={2}>
            <CardBody borderWidth={1} borderRadius={8}>
              <AuctionCategory onSelectItem={handleSelectCategory} />
            </CardBody>
          </Card>
          <Card flex={6}>
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
                      <AuctionItem
                        key={index}
                        item={item}
                        loading={loading}
                        optionFlag={optionFlag}
                      />
                    ))}
                  </Flex>
                  <Pagination
                    page={page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </>
              ): (
                <Flex justifyContent="center" align="center" height="100%">
                  조회된 내용이 없습니다!
                </Flex>
              )}
            </CardBody>
          </Card>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Store;
