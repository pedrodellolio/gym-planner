import { Box, HStack, Heading, Pressable, Text } from "native-base";
import { Link } from "expo-router";
import CircularProgress from "react-native-circular-progress-indicator";

export default function CurrentWorkoutBanner() {
  return (
    <>
      {/* <HStack alignItems={"center"} justifyContent={"space-between"} mx={1}>
        <Text color={"#323232"} fontWeight={500}>
          In progress
        </Text>
        <Link href="#" style={{ color: "#6B6B6B", fontWeight: "500" }}>
          See details
        </Link>
      </HStack> */}
      <Pressable
        backgroundColor="#212121"
        py={8}
        px={9}
        mt={1}
        rounded="xl"
        display="flex"
        flexDirection="row"
        alignItems="flex-start"
        justifyContent="space-between"
        w="full"
      >
        <Box>
          <Text color="#cecece" fontSize={"md"}>
            In progress
          </Text>
          <Text color="#fff" fontSize={"md"} mt={5}>
            Workout
          </Text>
          <Heading color="#EAEF05" fontWeight={"bold"}>
            Split: {"A"}
          </Heading>
        </Box>
        <CircularProgress value={20} valueSuffix="%" activeStrokeWidth={12} progressValueColor="#EAEF05" activeStrokeColor="#EAEF05" progressValueFontSize={20} radius={59}/>
      </Pressable>
    </>
  );
}
