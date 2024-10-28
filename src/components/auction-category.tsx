import React, { useState } from "react";
import { Box, Text, Icon, Collapse, VStack } from "@chakra-ui/react";
import { ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { AUCTION_CATEGORY, AuctionCategoryEnum } from "@/utils/constant";

type AuctionCategoryProps = {
  onSelectItem: (itemName: string) => void;
};

const AuctionCategory = ({ onSelectItem }: AuctionCategoryProps) => {
  return (
    <VStack align="start" spacing={1}>
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
    <Box width="100%" marginBottom={2}>
      <Box
        display="flex"
        alignItems="center"
        cursor="pointer"
        onClick={toggleOpen}
        py={2}
        px={3}
        _hover={{ backgroundColor: "whiteAlpha.300", borderRadius: 4 }}
      >
        <Icon as={isOpen ? ChevronDownIcon : ChevronRightIcon} mr={2} />
        <Text fontWeight="bold" fontSize={18}>{title}</Text>
      </Box>
      <Collapse in={isOpen} animateOpacity>
        <VStack align="start" pl={8} spacing={1}>
          {items.map((item) => (
            <Text
              key={item}
              fontSize={16}
              cursor="pointer"
              onClick={() => handleSelectItem(item)}
              _hover={{ color: "green.500" }}
            >
              {item}
            </Text>
          ))}
        </VStack>
      </Collapse>
    </Box>
  );
};

export default AuctionCategory;
