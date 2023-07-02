import {
  Box,
  HStack,
  Heading,
  Pressable,
  Text,
  VStack,
  View,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { SPLIT_TYPES } from "../../models/workout";

interface Props {
  selectedSplitTypeId: number;
  setSelectedSplitTypeId: React.Dispatch<React.SetStateAction<number>>;
}

export default function WorkoutFormStep(props: Props) {
  return (
    <View mt={10}>
      <VStack display={"flex"} justifyContent={"center"} space={5}>
        <Heading fontSize={18} textAlign={"center"}>
          Choose how your training will be divided
        </Heading>
        <VStack space={3}>
          {SPLIT_TYPES.map((split) => (
            <Pressable
              rounded={"lg"}
              key={split.id}
              borderWidth={split.id === props.selectedSplitTypeId ? 2 : 0}
              onPress={() => props.setSelectedSplitTypeId(split.id)}
              bgColor={"gray.300"}
              p={3}
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              h={"24"}
            >
              <Box w={"80%"}>
                <Text fontWeight={500} fontSize={16}>
                  {split.title}
                </Text>
                <Text color={"gray.500"}>{split.label}</Text>
              </Box>
              <MaterialIcons
                size={20}
                name={
                  split.id === props.selectedSplitTypeId
                    ? "radio-button-on"
                    : "radio-button-off"
                }
              />
            </Pressable>
          ))}
        </VStack>
      </VStack>
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     paddingTop: 50,
//   },
//   userIcon: {
//     width: 40,
//     height: 40,
//     borderRadius: 6,
//   },
//   logo: {
//     width: 66,
//     height: 58,
//   },
//   title: {
//     fontFamily: "Manrope",
//     fontSize: 20,
//     fontWeight: "bold",
//   },
// });
