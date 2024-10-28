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
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { OptionRenderer } from "./item-option";

export const AuctionItem = ({
  item,
  loading,
  optionFlag,
}: {
  item: IAuctionItem;
  loading: boolean;
  optionFlag: boolean;
}) => {
  const [optionGroup, setOptionGroup] = useState<{
    [key: string]: IAuctionItemOption[];
  }>();

  useEffect(() => {
    itemOptionSeperator(item.item_option);
  }, [item, optionFlag]);

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
    <Skeleton isLoaded={!loading}>
      <Card>
        <CardBody borderWidth={1} borderRadius={8}>
          <Box>
            <Flex justifyContent="space-between" alignItems="flex-end">
              <Text fontSize={20} fontWeight={600}>
                {item.item_display_name}
              </Text>
              <Text fontSize={18} fontWeight={600}>
                {item.auction_price_per_unit.toLocaleString()} 골드
              </Text>
            </Flex>
            
            <Flex gap={4} marginTop={2}>
              {optionGroup && <OptionRenderer itemOption={optionGroup} />}
            </Flex>
          </Box>
        </CardBody>
      </Card>
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
