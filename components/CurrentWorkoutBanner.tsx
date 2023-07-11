import { Box, HStack, Heading, Pressable } from "native-base";
import { Link } from "expo-router";
import CircularProgress from "react-native-circular-progress-indicator";
import { useTheme } from "../context/theme";
import { Text } from "./themed/Text";

export default function CurrentWorkoutBanner() {
  const { theme } = useTheme();

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
        backgroundColor={theme.background[200]}
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
          <Text style={{ color: theme.white, marginTop: 20 }}>Workout</Text>
          <Heading color={theme.tint[500]} fontWeight={"bold"}>
            Split: {"A"}
          </Heading>
        </Box>
        <CircularProgress
          value={20}
          valueSuffix="%"
          activeStrokeWidth={12}
          progressValueColor={theme.tint[500]}
          activeStrokeColor={theme.tint[500]}
          progressValueFontSize={20}
          radius={59}
        />
      </Pressable>
    </>
  );
}
