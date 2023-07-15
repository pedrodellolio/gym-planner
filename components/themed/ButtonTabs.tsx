import { HStack, Pressable } from "native-base";
import { Text } from "./Text";
import { useTheme } from "../../context/theme";
import { Workout } from "../../models/workout";

interface Props {
  selectedValue: string;
  setSelectedValue: React.Dispatch<React.SetStateAction<string>>;
  data: Workout;
}
export function ButtonTabs(props: Props) {
  const { theme } = useTheme();

  return (
    <HStack
      mx={5}
      bgColor={theme.background[400]}
      p={1}
      rounded={"2xl"}
      alignItems={"center"}
      justifyContent={"space-evenly"}
    >
      {props.data.splits
        .sort((a, b) => a.title.localeCompare(b.title))
        .map((item, i) => {
          return (
            <Pressable
              key={i}
              onPress={() => props.setSelectedValue(item.title)}
              bgColor={
                props.selectedValue === item.title
                  ? theme.tint[400]
                  : theme.background[400]
              }
              py={1.5}
              px={5}
              rounded="2xl"
              w={`${100 / props.data.splits.length}%`}
            >
              <Text
                fontSize={16}
                color={
                  props.selectedValue === item.title ? theme.white : theme.text
                }
                fontFamily={"Figtree_600SemiBold"}
                textAlign={"center"}
              >
                {"Split " + item.title}
              </Text>
            </Pressable>
          );
        })}
    </HStack>
  );
}
