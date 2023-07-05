import {
  Box,
  Button,
  HStack,
  Heading,
  Pressable,
  Text,
  VStack,
  View,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { SPLIT_TYPES } from "../../models/workout";
import { SplitData } from "../../app/(tabs)/playlists/steps";

interface Props {
  formData: SplitData[];
  setFormData: React.Dispatch<React.SetStateAction<SplitData[]>>;
  //TODO: todos abaixo devem ser revisados
  selectedSplitTypeId: number;
  setSelectedSplitTypeId: React.Dispatch<React.SetStateAction<number>>;
  currentStep: number;
  updateCurrentStep: (value: number) => void;
  playlistId: string;
}

export default function WorkoutFormStep(props: Props) {
  const handleSplitData = () => {
    const value = SPLIT_TYPES[props.selectedSplitTypeId].divisions;
    const array = Array.from({ length: value }, (_, index) => {
      return {
        id: index,
        exercises: [],
      };
    });
    props.setFormData(array);
    props.updateCurrentStep(1);
  };
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
          <HStack px={5} justifyContent={"space-between"}>
            <Button
              display={props.currentStep === 1 ? "none" : "flex"}
              onPress={() => props.updateCurrentStep(-1)}
            >
              Back
            </Button>
            <Button onPress={handleSplitData}>Next</Button>
          </HStack>
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
