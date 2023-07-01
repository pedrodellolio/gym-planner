import {
  Text,
  FlatList,
  HStack,
  VStack,
  View,
  Pressable,
  Actionsheet,
  Box,
  useDisclose,
} from "native-base";
import { StyleSheet } from "react-native";

const data = [
  { id: "0", name: "Workout 1" },
  { id: "1", name: "Workout 2" },
];
export default function Playlists() {
  const { isOpen, onOpen, onClose } = useDisclose();
  return (
    <View p={5}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Pressable
            onLongPress={onOpen}
            borderBottomWidth="1"
            borderColor="muted.800"
            pl={["0", "5"]}
            pr={["0", "5"]}
            py="3"
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
                  <VStack>
                    <Text>{item.name}</Text>
                  </VStack>
                  {/* <Spacer /> */}
                </HStack>
              );
            }}
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
      />

      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Box w="100%" h={60} px={4} justifyContent="center">
            <Text
              fontSize="16"
              color="gray.500"
              _dark={{
                color: "gray.300",
              }}
            >
              Albums
            </Text>
          </Box>
          <Actionsheet.Item>Delete</Actionsheet.Item>
          <Actionsheet.Item isDisabled>Share</Actionsheet.Item>
          <Actionsheet.Item>Play</Actionsheet.Item>
          <Actionsheet.Item>Favourite</Actionsheet.Item>
          <Actionsheet.Item>Cancel</Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </View>
  );
}

const styles = StyleSheet.create({});
