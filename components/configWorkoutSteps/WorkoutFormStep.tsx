import { Box, HStack, Pressable, VStack, View } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { SPLIT_TYPES } from "../../models/workout";
import { SplitData } from "../../app/(tabs)/playlists/settingWorkout";
import { useTheme } from "../../context/theme";
import { Text } from "../themed/Text";
import { Button } from "../themed/Button";
import { Heading } from "../themed/Heading";

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
  const { theme } = useTheme();

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
    <View mt={2}>
      <VStack display={"flex"} justifyContent={"center"} space={5}>
        <Heading fontSize={22}>
          Choose how your training will be divided
        </Heading>
        <VStack space={3}>
          {SPLIT_TYPES.map((split) => (
            <Pressable
              rounded={"lg"}
              key={split.id}
              borderWidth={split.id === props.selectedSplitTypeId ? 2 : 0}
              borderColor={theme.tint[500]}
              onPress={() => props.setSelectedSplitTypeId(split.id)}
              bgColor={theme.background[400]}
              p={4}
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Box w={"80%"}>
                <Text fontWeight={500} style={{ color: theme.text }}>
                  {split.title}
                </Text>
                <Text fontSize={16} style={{ color: theme.text }}>
                  {split.label}
                </Text>
              </Box>
              <MaterialIcons
                size={20}
                color={
                  split.id === props.selectedSplitTypeId
                    ? theme.tint[500]
                    : theme.text
                }
                name={
                  split.id === props.selectedSplitTypeId
                    ? "radio-button-on"
                    : "radio-button-off"
                }
              />
            </Pressable>
          ))}
          <HStack justifyContent={"space-between"}>
            <Button
              px={10}
              title="Back"
              variant={"solid"}
              display={props.currentStep === 1 ? "none" : "flex"}
              onPress={() => props.updateCurrentStep(-1)}
            />
            <Button
              px={10}
              variant={"solid"}
              title="Next"
              onPress={handleSplitData}
            />
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
