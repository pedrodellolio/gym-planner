import { Box, Button, Text, VStack, View } from "native-base";
import { SPLIT_ORDER, SPLIT_TYPES } from "../../models/workout";
import { Link, useRouter } from "expo-router";

interface Props {
  selectedSplitTypeId: number;
  playlistId: string;
}

export default function WorkoutSplitStep(props: Props) {
  const router = useRouter();
  return (
    <View mt={10}>
      <VStack space={10}>
        {[...Array(SPLIT_TYPES[props.selectedSplitTypeId].divisions)].map(
          (_, i) => {
            return (
              <VStack key={i}>
                <Box bgColor={"gray.300"} p={3}>
                  <Text>Split {SPLIT_ORDER[i]}</Text>
                </Box>
                {/* <Link href="#">Add Exercise</Link> */}
                <Button
                  onPress={() =>
                    router.push({
                      pathname: `/playlists/exercises`,
                      params: { playlist: props.playlistId },
                    })
                  }
                >
                  Add exercise
                </Button>
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
