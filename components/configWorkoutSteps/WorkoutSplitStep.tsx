import { Box, Button, Text, VStack, View } from "native-base";
import { SPLIT_ORDER, SPLIT_TYPES } from "../../models/workout";
import { Link } from "expo-router";

interface Props {
  selectedSplitTypeId: number;
}

export default function WorkoutSplitStep(props: Props) {
  return (
    <View mt={10}>
      <VStack space={10}>
        {[...Array(SPLIT_TYPES[props.selectedSplitTypeId].divisions)].map(
          (_, i) => {
            return (
              <VStack>
                <Box bgColor={"gray.300"} p={3}>
                  <Text>Split {SPLIT_ORDER[i]}</Text>
                </Box>
                {/* <Link href="#">Add Exercise</Link> */}
                <Button>Add exercise</Button>
              </VStack>
            );
          }
        )}
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
