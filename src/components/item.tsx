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
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { OptionRenderer } from "./item-option";
import { useOptionFlagStore } from "@/stores/useOptionFlagStore";

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
            width='90%'
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
                    colorScheme="green"
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
                    개당 {item.auction_price_per_unit.toLocaleString()} 골드
                  </Text>
                )}
                <Text fontSize={{ smDown: "sm", sm: "md" }} fontWeight={600}>
                  {(
                    item.auction_price_per_unit * item.item_count
                  ).toLocaleString()}{" "}
                  골드
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

export const ShopItem = ({ item }: { item: INpcShopItem }) => {
  return (
    <Flex border="1px solid #FFF">
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
  );
};
