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
  Field,
  NativeSelectField,
  Spinner,
} from "@chakra-ui/react";
import { Toaster, toaster } from "@/components/ui/toaster";
import { useEffect, useState } from "react";
import { NativeSelectRoot } from "@/components/ui/native-select";
import { kakaoAdUnit } from "@/utils/constant";
import Ad from "@/components/kakao-ad";

const Auction = () => {
  const NEXON_API = new NexonAPI();
  const { optionFlag, toggleOptionFlag } = useOptionFlagStore();
  const [params, setParams] = useState<IAuctionRequestParams>({
    item_name: "",
  });

  const [loading, setLoading] = useState(false);
  const [auctionData, setAuctionData] = useState<Item[]>([]);
  // Pagination
  const [pagenationAuctionData, setPagenationAuctionData] = useState<Item[]>(
    []
  );
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [filter, setFilter] = useState({
    ergue: "",
    ergueMin: "",
    ergueMax: "",
    rank: "",
    option: "",
    inchantHead: "",
    inchantTail: "",
  });

  useEffect(() => {
    setPage(1);
  }, []);

  useEffect(() => {
    if (
      Object.values(filter).some((value) => value !== "") &&
      auctionData.length < 40
    ) {
      setLoading(true);
      appendAuctionItemList();
    }
  }, [auctionData]);

  const handleAuctionSearch = async () => {
    setPage(1);
    setLoading(true);
    try {
      if (params.auction_item_category == "" && params.item_name == "") {
        throw new Error(
          "검색할 카테고리 카테고리를 선택하거나 아이템 이름을 입력해주세요!"
        );
      }
      let filterArr: Item[] = [];
      const response: IAuctionResponse = await NEXON_API.getAuctionSearch(
        params
      );
      setParams({ ...params, cursor: response.next_cursor });
      filterArr = filterItems(response.auction_item, filter);
      setAuctionData(filterArr);
      auctionItemListPagenator();
    } catch (error: any) {
      if (error?.status == 400) {
        toaster.create({
          type: "error",
          title: "검색 실패",
          description: "경매장에서 아이템 목록을 불러오는데 실패하였습니다.",
        });
      } else {
        toaster.create({
          type: "error",
          title: "검색 실패",
          description: error.message,
        });
      }
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const appendAuctionItemList = async () => {
    setLoading(true);
    try {
      let filterArr: Item[] = [];
      if (params?.cursor === null) {
        return false;
      }
      const response: IAuctionResponse = await NEXON_API.getAuctionSearch(
        params
      );
      filterArr = filterItems(response.auction_item, filter);
      setParams({ ...params, cursor: response.next_cursor });
      setAuctionData(auctionData?.concat(filterArr));
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
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const filterItems = (
    items: Item[],
    filter: {
      ergue: string;
      ergueMin: string;
      ergueMax: string;
      rank: string;
      option: string;
      inchantHead: string;
      inchantTail: string;
    }
  ) => {
    return items.filter((item) => {
      // 각 조건이 모두 참이어야 항목이 포함됨
      const ergueMatch = filter.ergue
        ? item.item_option.some(
            (option) =>
              option.option_type === "에르그" &&
              option.option_sub_type === filter.ergue
          )
        : true;

      const ergueLevelMatch =
        filter.ergueMin || filter.ergueMax
          ? item.item_option.some((option) => {
              const optionValue = Number(option.option_value);
              return (
                option.option_type === "에르그" &&
                (filter.ergueMin === undefined ||
                  optionValue >= Number(filter.ergueMin)) &&
                (filter.ergueMax === undefined ||
                  optionValue <= Number(filter.ergueMax))
              );
            })
          : true;

      const rankMatch = filter.rank
        ? item.item_option.some(
            (option) =>
              option.option_type === "세공 랭크" &&
              option.option_value === filter.rank
          )
        : true;

      const optionMatch = filter.option
        ? item.item_option.some(
            (option) =>
              option.option_type === "세공 옵션" &&
              option.option_value?.includes(filter.option)
          )
        : true;

      const inchantHead = filter.inchantHead
        ? item.item_option.some(
            (option) =>
              option.option_type === "인챈트" &&
              option.option_sub_type === "접두" &&
              option.option_value?.includes(filter.inchantHead)
          )
        : true;

      const inchantTail = filter.inchantTail
        ? item.item_option.some(
            (option) =>
              option.option_type === "인챈트" &&
              option.option_sub_type === "접미" &&
              option.option_value?.includes(filter.inchantTail)
          )
        : true;

      // 모든 필터가 존재하면 true를 반환
      return (
        ergueMatch &&
        ergueLevelMatch &&
        rankMatch &&
        optionMatch &&
        inchantHead &&
        inchantTail
      );
    });
  };

  useEffect(() => {
    setLoading(true);
    auctionItemListPagenator();
    setTimeout(() => {
      setLoading(false);
    }, 500);
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

  const handleFilterChange = (e: any) => {
    const { name, value } = e.target;
    setFilter({
      ...filter,
      [name]: value,
    });
  };

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
            status="warning"
            borderRadius={8}
            title={`카테고리와 검색어 중 우선 적용된 사항 한 가지만 검색에 적용됩니다. 다른 조건으로 검색하려면 초기화 후 검색을 진행해주세요!`}
            fontSize={{ smDown: "xs", sm: "sm" }}
          >
            <Text>
              - 세공 옵션과, 인챈트는 키워드로 입력하시면 해당 키워드를 기준으로
              필터링 됩니다.
            </Text>
            <Text>
              - Ex) "다운어택" 검색시 다운어택 거리, 데미지 모두 필터링 됩니다.
            </Text>
          </Alert>
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
                    <>
                      <Text>현재 카테고리:</Text>
                      <Badge
                        variant="subtle"
                        colorPalette="green"
                        fontSize={14}
                      >
                        {params.auction_item_category}
                      </Badge>
                    </>
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
                    colorPalette="green"
                    size={{ smDown: "xs", sm: "sm" }}
                    disabled={loading}
                    onClick={() => handleAuctionSearch()}
                  >
                    {loading ? <Spinner /> : "검색"}
                  </Button>
                  <Button
                    width={100}
                    colorPalette="gray"
                    size={{ smDown: "xs", sm: "sm" }}
                    disabled={loading}
                    onClick={() => handleReset()}
                  >
                    초기화
                  </Button>
                </Flex>
              </Flex>
            </CardBody>
          </Card.Root>
          <Box display={{ lg: "none" }}>
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
          <Card.Root>
            <CardBody borderWidth={1} borderRadius={8}>
              <Flex justifyContent="space-between" alignItems="center" gap={4}>
                <Checkbox checked={optionFlag} onChange={handleOptionFlag}>
                  아이템 옵션 같이보기
                </Checkbox>
              </Flex>
              <Flex gap={4} marginTop={4} flexDirection={{ smDown: "column" }}>
                <Field.Root flex={1}>
                  <Field.Label>에르그</Field.Label>
                  <NativeSelectRoot onChange={handleFilterChange}>
                    <NativeSelectField placeholder="등급" name="ergue">
                      <option value="">전체</option>
                      <option value="B">B</option>
                      <option value="A">A</option>
                      <option value="S">S</option>
                    </NativeSelectField>
                  </NativeSelectRoot>
                  <Flex alignItems="center" gap={4}>
                    <Input
                      placeholder="최소"
                      name="ergueMin"
                      onChange={handleFilterChange}
                    />
                    <Text>~</Text>
                    <Input
                      placeholder="최대"
                      name="ergueMax"
                      onChange={handleFilterChange}
                    />
                  </Flex>
                </Field.Root>
                <Field.Root flex={1}>
                  <Field.Label>세공</Field.Label>
                  <NativeSelectRoot onChange={handleFilterChange}>
                    <NativeSelectField placeholder="랭크" name="rank">
                      <option value="">전체</option>
                      <option value="3">3</option>
                      <option value="2">2</option>
                      <option value="1">1</option>
                    </NativeSelectField>
                  </NativeSelectRoot>
                  <Input
                    placeholder="옵션"
                    name="option"
                    onChange={handleFilterChange}
                  />
                </Field.Root>
                <Field.Root flex={1}>
                  <Field.Label>인챈트</Field.Label>
                  <Input
                    placeholder="접두"
                    name="inchantHead"
                    onChange={handleFilterChange}
                  />
                  <Input
                    placeholder="접미"
                    name="inchantTail"
                    onChange={handleFilterChange}
                  />
                </Field.Root>
              </Flex>
            </CardBody>
          </Card.Root>
          <Flex gap={4}>
            <Card.Root flex={1} minW={200} display={{ lgDown: "none" }}>
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
                        <AuctionItem
                          key={index}
                          item={item}
                          loading={loading}
                        />
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
    </>
  );
};

export default Auction;
