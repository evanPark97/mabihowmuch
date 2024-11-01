import React, { useState } from "react";
import { Text, Collapsible, VStack, Flex } from "@chakra-ui/react";
import { AUCTION_CATEGORY, AuctionCategoryEnum } from "@/utils/constant";
import { HiChevronDown, HiChevronRight } from "react-icons/hi";

type AuctionCategoryProps = {
  onSelectItem: (itemName: string) => void;
};

const AuctionCategory = ({ onSelectItem }: AuctionCategoryProps) => {
  return (
    <VStack align="start" gap={1}>
      {(
        Object.keys(AUCTION_CATEGORY) as Array<keyof typeof AuctionCategoryEnum>
      ).map((category) => (
        <TreeItem
          key={category}
          title={category}
          items={AUCTION_CATEGORY[category]}
          onSelectItem={onSelectItem}
        />
      ))}
    </VStack>
  );
};

type TreeItemProps = {
  title: string;
  items: string[];
  onSelectItem: (itemName: string) => void;
};

const TreeItem = ({ title, items, onSelectItem }: TreeItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectItem, setSelectItem] = useState<string>();

  const toggleOpen = () => setIsOpen(!isOpen);
  const handleSelectItem = (item: string) => {
    setSelectItem(item);
    onSelectItem(item);
  };

  return (
    <Collapsible.Root width="100%" marginBottom={2}>
      <Collapsible.Trigger>
        <Flex
          alignItems="center"
          cursor="pointer"
          onClick={toggleOpen}
          py={2}
          px={3}
          _hover={{ backgroundColor: "whiteAlpha.300", borderRadius: 4 }}
        >
          {isOpen ? <HiChevronDown /> : <HiChevronRight /> }
          <Text fontWeight="bold" fontSize={16}>
            {title}
          </Text>
        </Flex>
      </Collapsible.Trigger>
      <Collapsible.Content>
        <VStack align="start" pl={8} gap={1}>
          {items.map((item) => (
            <Text
              key={item}
              fontSize={14}
              cursor="pointer"
              onClick={() => handleSelectItem(item)}
              _hover={{ color: "green.500" }}
            >
              {item}
            </Text>
          ))}
        </VStack>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};

export default AuctionCategory;
