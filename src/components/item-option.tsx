import { ItemOption as IAuctionItemOption } from "@/interface/auction-list";
import { Flex, Box, Text, Separator } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";

const OptionValueRenderer = (option: IAuctionItemOption) => {
  const rankColor = (rank: string | null) => {
    switch (rank) {
      case "3":
        return "";
      case "2":
        return "yellow.500";
      case "1":
        return "pink.500";
      default:
        return "";
    }
  };

  switch (option.option_type) {
    case "공격":
      return (
        <Flex gap={2} key={uuidv4()}>
          <Text>{option.option_value}</Text>
          <Text>~</Text>
          <Text>{option.option_value2}</Text>
        </Flex>
      );

    case "내구력":
      return (
        <Flex gap={2} key={uuidv4()}>
          <Text>{option.option_value}</Text>
          <Text>/</Text>
          <Text>{option.option_value2}</Text>
        </Flex>
      );

    case "밸런스":
      return (
        <Flex gap={2} key={uuidv4()}>
          <Text>{option.option_value}</Text>
        </Flex>
      );

    case "크리티컬":
      return (
        <Flex gap={2} key={uuidv4()}>
          <Text>{option.option_value}</Text>
        </Flex>
      );

    case "특별 개조":
    case "품질":
    case "토템 효과":
    case "토템 추가 옵션":
    case "토템 강화 제한":
      return (
        <Flex gap={2} key={uuidv4()}>
          <Text>{option.option_sub_type}</Text>
          <Text>{option.option_value}</Text>
        </Flex>
      );

    case "에르그":
      return (
        <Flex gap={2} key={uuidv4()}>
          <Text>{option.option_sub_type}</Text>
          <Text>{option.option_value}</Text>
          <Text>/</Text>
          <Text>{option.option_value2}</Text>
        </Flex>
      );

    case "세트 효과":
    case "사용 효과":
      return (
        <Flex gap={2} key={uuidv4()}>
          <Text>{option.option_value}</Text>
          <Text>({option.option_value2})</Text>
        </Flex>
      );
    case "남은 전용 해제 가능 횟수":
    case "남은 사용 횟수":
    case "남은 거래 횟수":
      return (
        <Flex gap={2} key={uuidv4()}>
          <Text>{option.option_value}</Text>
        </Flex>
      );

    case "아이템 색상":
    case "색상":
      return (
        <Flex gap={2} alignItems="center" key={uuidv4()}>
          <Box
            width={5}
            height={5}
            marginRight={1}
            borderRadius={10}
            background={`rgb(${option.option_value})`}
            borderWidth={1}
          ></Box>
          <Text>{option.option_sub_type}</Text>
          <Text>
            {option.option_value ? option.option_value : option.option_desc}
          </Text>
        </Flex>
      );

    case "인챈트":
      return (
        <Flex key={uuidv4()} flexDirection="column" marginBottom={2}>
          <Flex gap={1}>
            <Text fontWeight={600}>{option.option_sub_type}</Text>
            <Text fontWeight={600}>{option.option_value}</Text>
          </Flex>
          <Box>
            <Text>{option.option_desc}</Text>
          </Box>
        </Flex>
      );

    case "인챈트 불가능":
      return (
        <Flex gap={2} key={uuidv4()}>
          <Text>{option.option_value}</Text>
          <Text>{option.option_value2}</Text>
        </Flex>
      );

    case "보석 개조":
      return (
        <Flex gap={2} key={uuidv4()}>
          <Text>{option.option_value}</Text>
        </Flex>
      );

    case "일반 개조":
      return (
        <Flex gap={2} key={uuidv4()}>
          <Text>{option.option_value}</Text>
          <Text>/</Text>
          <Text>{option.option_value2}</Text>
        </Flex>
      );

    case "세공 랭크":
      return (
        <Flex gap={2} key={uuidv4()}>
          <Text color={rankColor(option.option_value)} fontWeight={600}>
            세공 {option.option_value} 랭크
          </Text>
        </Flex>
      );

    case "세공 옵션":
      return (
        <Flex gap={2} key={uuidv4()}>
          <Text>{option.option_value}</Text>
        </Flex>
      );

    case "내구도":
      return (
        <Flex gap={2} key={uuidv4()}>
          <Text>{option.option_value}</Text>
        </Flex>
      );

    case "인챈트 종류":
      return (
        <Flex gap={2} key={uuidv4()}>
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
            <Flex gap={2} key="attack">
              <Text fontWeight={600}>{optionType}</Text>
              <Box>{option.map((_option) => OptionValueRenderer(_option))}</Box>
            </Flex>
          );
          break;

        case "내구력":
          layoutMap.durability = (
            <Flex gap={2} key="durability">
              <Text fontWeight={600}>{optionType}</Text>
              <Box>{option.map((_option) => OptionValueRenderer(_option))}</Box>
            </Flex>
          );
          break;

        case "밸런스":
          layoutMap.balance = (
            <Flex gap={2} key="balance">
              <Text fontWeight={600}>{optionType}</Text>
              <Box>{option.map((_option) => OptionValueRenderer(_option))}</Box>
            </Flex>
          );
          break;

        case "크리티컬":
          layoutMap.critical = (
            <Flex gap={2} key="critical">
              <Text fontWeight={600}>{optionType}</Text>
              <Box>{option.map((_option) => OptionValueRenderer(_option))}</Box>
            </Flex>
          );
          break;

        case "특별 개조":
        case "품질":
          layoutMap.special = (
            <Flex gap={2} key="special">
              <Text fontWeight={600}>{optionType}</Text>
              <Box>{option.map((_option) => OptionValueRenderer(_option))}</Box>
            </Flex>
          );
          break;

        case "에르그":
          layoutMap.ergue = (
            <Flex gap={2} key="ergue">
              <Text fontWeight={600}>{optionType}</Text>
              <Box>{option.map((_option) => OptionValueRenderer(_option))}</Box>
            </Flex>
          );
          break;

        case "세트 효과":
        case "사용 효과":
          layoutMap.set = (
            <Flex key="set" flexDirection="column">
              <Text fontWeight={600}>{optionType}</Text>
              <Box>{option.map((_option) => OptionValueRenderer(_option))}</Box>
            </Flex>
          );
          break;

        case "남은 전용 해제 가능 횟수":
        case "남은 사용 횟수":
        case "남은 거래 횟수":
          layoutMap.belonging = (
            <Flex gap={2} key="belonging">
              <Text fontWeight={600}>{optionType}</Text>
              <Box>{option.map((_option) => OptionValueRenderer(_option))}</Box>
            </Flex>
          );
          break;

        case "아이템 색상":
        case "색상":
          layoutMap.color = (
            <Box gap={2} key="color">
              <Text fontWeight={600} marginBottom={2}>
                {optionType}
              </Text>
              <Flex gap={2} flexDirection="column">
                {option.map((_option) => OptionValueRenderer(_option))}
              </Flex>
            </Box>
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
            <Flex gap={2} key="inchantAble">
              <Text fontWeight={600}>{optionType}</Text>
              <Box>{option.map((_option) => OptionValueRenderer(_option))}</Box>
            </Flex>
          );
          break;

        case "보석 개조":
          layoutMap.gem = (
            <Flex gap={2} key="gem">
              <Text fontWeight={600}>{optionType}</Text>
              <Box>{option.map((_option) => OptionValueRenderer(_option))}</Box>
            </Flex>
          );
          break;

        case "일반 개조":
          layoutMap.alteration = (
            <Flex gap={2} key="alteration">
              <Text fontWeight={600}>{optionType}</Text>
              <Box>{option.map((_option) => OptionValueRenderer(_option))}</Box>
            </Flex>
          );
          break;

        case "세공 랭크":
          layoutMap.rank = (
            <Flex gap={2} key="rank">
              <Box>{option.map((_option) => OptionValueRenderer(_option))}</Box>
            </Flex>
          );
          break;

        case "세공 옵션":
          layoutMap.options = (
            <Flex gap={2} key="options">
              <Box>{option.map((_option) => OptionValueRenderer(_option))}</Box>
            </Flex>
          );
          break;

        case "내구도":
          layoutMap.durability = (
            <Flex gap={2} key="durability">
              <Text fontWeight={600}>{optionType}</Text>
              <Box>{option.map((_option) => OptionValueRenderer(_option))}</Box>
            </Flex>
          );
          break;

        case "인챈트 종류":
          layoutMap.inchant = (
            <Flex gap={2} key="options">
              <Box>{option.map((_option) => OptionValueRenderer(_option))}</Box>
            </Flex>
          );
          break;

        case "토템 효과":
          layoutMap.totemEffect = (
            <Flex gap={2} key="totem">
              <Text fontWeight={600}>{optionType}</Text>
              <Box>{option.map((_option) => OptionValueRenderer(_option))}</Box>
            </Flex>
          );
          break;
        case "토템 추가 옵션":
          layoutMap.totemOption = (
            <Flex gap={2} key="totem">
              <Text fontWeight={600}>{optionType}</Text>
              <Box>{option.map((_option) => OptionValueRenderer(_option))}</Box>
            </Flex>
          );
          break;
        case "토템 강화 제한":
          layoutMap.totemLimit = (
            <Flex gap={2} key="totem">
              <Text fontSize={{ mdDown: "sm", md: "md" }} fontWeight={600}>
                {optionType}
              </Text>
              <Box>{option.map((_option) => OptionValueRenderer(_option))}</Box>
            </Flex>
          );
          break;

        default:
          break;
      }
    }

    return (
      <Box flex={1}>
        <Separator />
        <Box marginTop={4}>{layoutMap.inchant}</Box>
        <Flex
          gap={4}
          justifyContent="space-between"
          alignItems="flex-start"
          marginTop={2}
          fontSize={{ mdDown: "xs", md: "sm" }}
          flexDirection={{ mdDown: "column", md: "row" }}
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
            <Box>{layoutMap.totemEffect}</Box>
          </Box>
          <Box>
            <Box>{layoutMap.totemOption}</Box>
            <Box>{layoutMap.totemLimit}</Box>
            <Box>{layoutMap.color}</Box>
          </Box>
        </Flex>
      </Box>
    );
  };

  return handleItemOption();
};
