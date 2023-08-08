import { Pressable, HStack, VStack } from "native-base";
import { Text } from "./Text";
import { useColorScheme } from "react-native";
import Colors from "../../constants/Colors";
import { useTheme } from "../../context/theme";

type Props = {
  item: any;
  onPress?: () => void;
  onLongPress?: () => void;
};

export function FlatListItem(props: Props) {
  const { theme, colorScheme } = useTheme();
  return (
    <Pressable
      key={props.item.id}
      onPress={props.onPress}
      onLongPress={props.onLongPress}
      borderColor={colorScheme === "dark" ? theme.border[400] : theme.border[400]}
      borderBottomWidth="1"
      pl={["0", "5"]}
      pr={["0", "5"]}
      py="6"
    >
      {({ isPressed }) => {
        return (
          <HStack
            style={{
              transform: [
                {
                  scale: isPressed ? 0.99 : 1,
                },
              ],
            }}
            space={[2, 3]}
            justifyContent="space-between"
          >
            <HStack>
              <Text fontSize={16} fontWeight={500}>
                {props.item.name ?? props.item[0]}
              </Text>
            </HStack>
          </HStack>
        );
      }}
    </Pressable>
  );
}
