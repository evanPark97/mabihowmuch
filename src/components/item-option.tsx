import { ItemOption as IAuctionItemOption } from "@/interface/auction-list";
import { Flex, Box, Text } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";

const OptionValueRenderer = (option: IAuctionItemOption) => {
  const rankColor = (rank: string | null) => {
    switch (rank) {
      case "3":
        return "white";
      case "2":
        return "blue.500";
      case "1":
        return "pink.500";
      default:
        return "white";
    }
  };

  switch (option.option_type) {
    case "공격":
      return (
        <Flex gap={1} key={uuidv4()}>
          <Text>{option.option_value}</Text>
          <Text>~</Text>
          <Text>{option.option_value2}</Text>
        </Flex>
      );

    case "내구력":
      return (
        <Flex gap={1} key={uuidv4()}>
          <Text>{option.option_value}</Text>
          <Text>/</Text>
          <Text>{option.option_value2}</Text>
        </Flex>
      );

    case "밸런스":
      return (
        <Flex gap={1} key={uuidv4()}>
          <Text>{option.option_value}</Text>
        </Flex>
      );

    case "크리티컬":
      return (
        <Flex gap={1} key={uuidv4()}>
          <Text>{option.option_value}</Text>
        </Flex>
      );

    case "특별 개조":
      return (
        <Flex gap={1} key={uuidv4()}>
          <Text>{option.option_sub_type}</Text>
          <Text>{option.option_value}</Text>
        </Flex>
      );

    case "에르그":
      return (
        <Flex gap={1} key={uuidv4()}>
          <Text>{option.option_sub_type}</Text>
          <Text>{option.option_value}</Text>
          <Text>/</Text>
          <Text>{option.option_value2}</Text>
        </Flex>
      );

    case "세트 효과":
      return (
        <Flex gap={1} key={uuidv4()}>
          <Text>{option.option_value}</Text>
          <Text>({option.option_value2})</Text>
        </Flex>
      );
    case "남은 전용 해제 가능 횟수":
      return (
        <Flex gap={1} key={uuidv4()}>
          <Text>{option.option_value}</Text>
        </Flex>
      );

    case "아이템 색상":
      return (
        <Flex gap={1} alignItems="center" key={uuidv4()}>
          <Box
            width={5}
            height={5}
            marginRight={1}
            borderRadius={10}
            background={`rgb(${option.option_value})`}
          ></Box>
          <Text>{option.option_value}</Text>
          <Text>{option.option_value2}</Text>
        </Flex>
      );

    case "인챈트":
      return (
        <Flex gap={1} key={uuidv4()}>
          <Flex gap={1}>
            <Text>{option.option_sub_type}</Text>
            <Text>{option.option_value}</Text>
          </Flex>
          <Box>
            <Text>{option.option_desc}</Text>
          </Box>
        </Flex>
      );

    case "인챈트 불가능":
      return (
        <Flex gap={1} key={uuidv4()}>
          <Text>{option.option_value}</Text>
          <Text>{option.option_value2}</Text>
        </Flex>
      );

    case "보석 개조":
      return (
        <Flex gap={1} key={uuidv4()}>
          <Text>{option.option_value}</Text>
        </Flex>
      );

    case "일반 개조":
      return (
        <Flex gap={1} key={uuidv4()}>
          <Text>{option.option_value}</Text>
          <Text>/</Text>
          <Text>{option.option_value2}</Text>
        </Flex>
      );

    case "세공 랭크":
      return (
        <Flex gap={1} key={uuidv4()}>
          <Text color={rankColor(option.option_value)}>
            세공 {option.option_value} 랭크
          </Text>
        </Flex>
      );

    case "세공 옵션":
      return (
        <Flex gap={1} key={uuidv4()}>
          <Text>{option.option_value}</Text>
        </Flex>
      );

    default:
      break;
  }
};

export const OptionRenderer = ({
  itemOption,
}: {
  itemOption: { [key: string]: IAuctionItemOption[] };
}) => {
  const handleItemOption = () => {
    let layoutMap: {
      [key: string]: JSX.Element | null;
    } = {};
    for (const optionType of Object.keys(itemOption)) {
      const option = itemOption[optionType];
      switch (optionType) {
        case "공격":
          layoutMap.attack = (
            <Flex gap={1} key="attack">
              <Text>{optionType}</Text>
              <Box>{option.map((_option) => OptionValueRenderer(_option))}</Box>
            </Flex>
          );
          break;

        case "내구력":
          layoutMap.durability = (
            <Flex gap={1} key="durability">
              <Text>{optionType}</Text>
              <Box>{option.map((_option) => OptionValueRenderer(_option))}</Box>
            </Flex>
          );
          break;

        case "밸런스":
          layoutMap.balance = (
            <Flex gap={1} key="balance">
              <Text>{optionType}</Text>
              <Box>{option.map((_option) => OptionValueRenderer(_option))}</Box>
            </Flex>
          );
          break;

        case "크리티컬":
          layoutMap.critical = (
            <Flex gap={1} key="critical">
              <Text>{optionType}</Text>
              <Box>{option.map((_option) => OptionValueRenderer(_option))}</Box>
            </Flex>
          );
          break;

        case "특별 개조":
          layoutMap.special = (
            <Flex gap={1} key="special">
              <Text>{optionType}</Text>
              <Box>{option.map((_option) => OptionValueRenderer(_option))}</Box>
            </Flex>
          );
          break;

        case "에르그":
          layoutMap.ergue = (
            <Flex gap={1} key="ergue">
              <Text>{optionType}</Text>
              <Box>{option.map((_option) => OptionValueRenderer(_option))}</Box>
            </Flex>
          );
          break;

        case "세트 효과":
          layoutMap.set = (
            <Flex gap={1} key="set">
              <Text>{optionType}</Text>
              <Box>{option.map((_option) => OptionValueRenderer(_option))}</Box>
            </Flex>
          );
          break;

        case "남은 전용 해제 가능 횟수":
          layoutMap.belonging = (
            <Flex gap={1} key="belonging">
              <Text>{optionType}</Text>
              <Box>{option.map((_option) => OptionValueRenderer(_option))}</Box>
            </Flex>
          );
          break;

        case "아이템 색상":
          layoutMap.color = (
            <Flex gap={1} key="color">
              <Text>{optionType}</Text>
              <Box>{option.map((_option) => OptionValueRenderer(_option))}</Box>
            </Flex>
          );
          break;

        case "인챈트":
          layoutMap.inchant = (
            <Flex direction="column" gap={1} key="inchant">
              <Box>{option.map((_option) => OptionValueRenderer(_option))}</Box>
            </Flex>
          );
          break;

        case "인챈트 불가능":
          layoutMap.inchantAble = (
            <Flex gap={1} key="inchantAble">
              <Text>{optionType}</Text>
              <Box>{option.map((_option) => OptionValueRenderer(_option))}</Box>
            </Flex>
          );
          break;

        case "보석 개조":
          layoutMap.gem = (
            <Flex gap={1} key="gem">
              <Text>{optionType}</Text>
              <Box>{option.map((_option) => OptionValueRenderer(_option))}</Box>
            </Flex>
          );
          break;

        case "일반 개조":
          layoutMap.alteration = (
            <Flex gap={1} key="alteration">
              <Text>{optionType}</Text>
              <Box>{option.map((_option) => OptionValueRenderer(_option))}</Box>
            </Flex>
          );
          break;

        case "세공 랭크":
          layoutMap.rank = (
            <Flex gap={1} key="rank">
              <Box>{option.map((_option) => OptionValueRenderer(_option))}</Box>
            </Flex>
          );
          break;

        case "세공 옵션":
          layoutMap.options = (
            <Flex gap={1} key="options">
              <Box>{option.map((_option) => OptionValueRenderer(_option))}</Box>
            </Flex>
          );
          break;

        default:
          break;
      }
    }

    return (
      <Box>
        <Box>{layoutMap.inchant}</Box>
        <Flex
          gap={4}
          justifyContent="space-between"
          alignItems="flex-start"
          marginTop={2}
        >
          <Box>
            <Box>
              {layoutMap.attack}
              {layoutMap.durability}
              {layoutMap.balance}
              {layoutMap.critical}
            </Box>
            <Box>
              {layoutMap.special}
              {layoutMap.gem}
              {layoutMap.alteration}
              {layoutMap.belonging}
            </Box>
          </Box>
          <Box>
            <Box>{layoutMap.ergue}</Box>
            <Box>
              {layoutMap.rank}
              {layoutMap.options}
            </Box>
            <Box>{layoutMap.set}</Box>
          </Box>
          <Box>{layoutMap.color}</Box>
        </Flex>
      </Box>
    );
  };

  return handleItemOption();
};
