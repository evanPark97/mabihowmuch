import {
  Item as IAuctionItem,
  ItemOption as IAuctionItemOption,
} from "@/interface/auction-list";
import { Item as INpcShopItem } from "@/interface/ncp-shop";
import {
  Flex,
  Box,
  Text,
  Image,
  Skeleton,
  CardBody,
  Card,
  Button,
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  Separator,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { OptionRenderer } from "./item-option";
import { useOptionFlagStore } from "@/stores/useOptionFlagStore";
import { formatCurrency } from "@/utils/common";

export const AuctionItem = ({
  item,
  loading,
}: {
  item: IAuctionItem;
  loading: boolean;
}) => {
  const { optionFlag } = useOptionFlagStore();
  const [optionGroup, setOptionGroup] = useState<{
    [key: string]: IAuctionItemOption[];
  }>();
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    itemOptionSeperator(item.item_option);
  }, [item]);

  const itemOptionSeperator = useCallback(
    (option: IAuctionItemOption[]) => {
      const _optionGroup: { [key: string]: IAuctionItemOption[] } = {};
      if (option) {
        for (const _option of option) {
          if (!_option.option_type) continue;

          if (!_optionGroup[_option.option_type]) {
            _optionGroup[_option.option_type] = [];
          }
          _optionGroup[_option.option_type].push(_option);
        }
        setOptionGroup(_optionGroup);
      }
    },
    [item]
  );

  return (
    <Skeleton loading={loading} position="relative">
      {!optionFlag && (
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
              <DialogTitle>{item.item_display_name}</DialogTitle>
            </DialogHeader>
            <DialogBody>
              {optionGroup && <OptionRenderer itemOption={optionGroup} />}
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
      )}
      <Card.Root
        backgroundColor={{
          _dark: openDialog ? "whiteAlpha.300" : "",
          _light: openDialog ? "blackAlpha.300" : "",
        }}
      >
        <CardBody borderWidth={1} borderRadius={8}>
          <Box>
            <Text fontSize={12}>
              만료일: {new Date(item.date_auction_expire).toLocaleString()}
            </Text>
            <Flex
              justifyContent="space-between"
              alignItems={{ mdDown: "flex-start", md: "flex-end" }}
              flexDirection={{ mdDown: "column", md: "row" }}
            >
              <Flex
                gap={2}
                alignItems={{ mdDown: "flex-start", md: "center" }}
                flexDirection={{ mdDown: "column", md: "row" }}
                width="100%"
              >
                <Text fontSize={{ smDown: "sm", sm: "md" }} fontWeight={600}>
                  {item.item_display_name}{" "}
                  {item.item_count > 1 && `(${item.item_count}개)`}
                </Text>
                {!optionFlag && (
                  <Button
                    variant="outline"
                    colorPalette="green"
                    size={{ smDown: "xs", sm: "sm" }}
                    onClick={() => setOpenDialog(true)}
                  >
                    옵션 보기
                  </Button>
                )}
              </Flex>
              <Flex flexDirection="column" alignItems="flex-end" width="100%">
                {item.item_count > 1 && (
                  <Text fontSize={{ smDown: "xs", sm: "sm" }}>
                    개당 {formatCurrency(item.auction_price_per_unit)} 골드
                  </Text>
                )}
                <Text fontSize={{ smDown: "sm", sm: "md" }} fontWeight={600}>
                  {formatCurrency(
                    item.auction_price_per_unit * item.item_count
                  )}
                  &nbsp;골드
                </Text>
              </Flex>
            </Flex>
            {optionFlag && (
              <Flex gap={4} marginTop={2}>
                {optionGroup && <OptionRenderer itemOption={optionGroup} />}
              </Flex>
            )}
          </Box>
        </CardBody>
      </Card.Root>
    </Skeleton>
  );
};

export const ShopItem = ({
  item,
  loading,
}: {
  item: INpcShopItem;
  loading: boolean;
}) => {
  const { optionFlag } = useOptionFlagStore();
  const [optionGroup, setOptionGroup] = useState<{
    [key: string]: IAuctionItemOption[];
  }>();
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    itemOptionSeperator(item.item_option);
  }, [item]);

  const itemOptionSeperator = useCallback(
    (option: IAuctionItemOption[]) => {
      const _optionGroup: { [key: string]: IAuctionItemOption[] } = {};
      if (option) {
        for (const _option of option) {
          if (!_option.option_type) continue;

          if (!_optionGroup[_option.option_type]) {
            _optionGroup[_option.option_type] = [];
          }
          _optionGroup[_option.option_type].push(_option);
        }
        setOptionGroup(_optionGroup);
      }
    },
    [item]
  );
  return (
    <Skeleton loading={loading} position="relative">
      {!optionFlag && (
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
              <DialogTitle>{item.item_display_name}</DialogTitle>
            </DialogHeader>
            <DialogBody>
              <Box fontSize={{ mdDown: "xs", md: "sm" }}>
                <Flex alignItems="center" gap={2} flexWrap="wrap">
                  <Box>
                    {item.price.map((price, index) => (
                      <Text key={index}>
                        {price.price_value.toLocaleString()} {price.price_type}
                      </Text>
                    ))}
                  </Box>
                </Flex>
                <Text color="red.400">
                  {item.limit_type &&
                    `${item.limit_type} ${item.limit_value}개 제한`}
                </Text>
              </Box>
              {optionGroup && <OptionRenderer itemOption={optionGroup} />}
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
      )}
      <Card.Root>
        <Card.Body>
          <Flex alignItems="center" gap={8}>
            <Image
              src={item.image_url}
              objectFit="contain"
              backgroundPosition="center"
              width="64px"
              height="64px"
              loading="lazy"
            />
            <Flex flex={1} gap={4} flexDirection="column">
              <Box fontSize={{ mdDown: "xs", md: "sm" }}>
                <Flex
                  flex={1}
                  gap={2}
                  justifyContent="space-between"
                  flexDirection={{ mdDown: "column", md: "row" }}
                >
                  <Text>
                    {item.item_display_name}{" "}
                    {item.item_count > 1 && `(${item.item_count} 개)`}
                  </Text>
                  <Box>
                    {item.price.map((price, index) => (
                      <Text key={index}>
                        {formatCurrency(price.price_value)} {price.price_type}
                      </Text>
                    ))}
                  </Box>
                </Flex>
                <Text color="red.400">
                  {item.limit_type &&
                    `${item.limit_type} ${item.limit_value}개 제한`}
                </Text>
              </Box>

              {optionFlag ? (
                <OptionRenderer itemOption={optionGroup} />
              ) : (
                optionGroup &&
                Object.keys(optionGroup).length > 0 && (
                  <Box>
                    <Button
                      variant="outline"
                      colorPalette="green"
                      size={{ smDown: "xs", sm: "sm" }}
                      onClick={() => setOpenDialog(true)}
                    >
                      옵션 보기
                    </Button>
                  </Box>
                )
              )}
            </Flex>
          </Flex>
        </Card.Body>
      </Card.Root>
    </Skeleton>
  );
};
