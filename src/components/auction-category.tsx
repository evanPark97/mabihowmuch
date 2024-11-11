import React, { useEffect, useState } from "react";
import { Text, VStack, Flex } from "@chakra-ui/react";
import { AUCTION_CATEGORY, AuctionCategoryEnum } from "@/utils/constant";
import { HiChevronDown, HiChevronRight } from "react-icons/hi";

type AuctionCategoryProps = {
  onSelectItem: (itemName: string) => void;
};

const AuctionCategory = ({ onSelectItem }: AuctionCategoryProps) => {
  // 현재 열려 있는 카테고리 상태 관리
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const handleToggle = (category: string) => {
    // 이미 열린 카테고리를 클릭하면 닫히게, 아니면 해당 카테고리 열리게 설정
    setOpenCategory((prev) => (prev === category ? null : category));
  };

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
          isOpen={openCategory === category} // 해당 항목이 열려 있는지 확인
          onToggle={() => handleToggle(category)}
        />
      ))}
    </VStack>
  );
};

type TreeItemProps = {
  title: string;
  items: string[];
  onSelectItem: (itemName: string) => void;
  isOpen: boolean;
  onToggle: () => void;
};

const TreeItem = ({
  title,
  items,
  onSelectItem,
  isOpen,
  onToggle,
}: TreeItemProps) => {
  const [selectItem, setSelectItem] = useState<string>();

  useEffect(() => {
    setSelectItem("");
  }, [isOpen]);

  const handleSelectItem = (item: string) => {
    setSelectItem(item);
    onSelectItem(item);
  };

  return (
    <VStack width="100%" marginBottom={2} align="start">
      <Flex
        alignItems="center"
        cursor="pointer"
        onClick={onToggle}
        py={2}
        px={3}
        _hover={{ backgroundColor: "whiteAlpha.300", borderRadius: 4 }}
      >
        {isOpen ? <HiChevronDown /> : <HiChevronRight />}
        <Text fontWeight="bold" fontSize={16}>
          {title}
        </Text>
      </Flex>
      {isOpen && (
        <VStack align="start" gap={1} pl={2} width="100%">
          {items.map((item) => (
            <Text
              width="100%"
              px={8}
              py={2}
              borderRadius={8}
              key={item}
              fontSize={14}
              cursor="pointer"
              onClick={() => handleSelectItem(item)}
              _hover={{ color: "green.500" }}
              background={selectItem === item ? {_dark: "whiteAlpha.300", _light: "blackAlpha.300"} : "initial"}
            >
              {item}
            </Text>
          ))}
        </VStack>
      )}
    </VStack>
  );
};

export default AuctionCategory;
