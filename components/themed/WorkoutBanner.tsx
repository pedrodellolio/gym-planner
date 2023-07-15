import { Box, Circle, HStack, IconButton, Pressable } from "native-base";
import { Text } from "./Text";
import { useTheme } from "../../context/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Workout } from "../../models/workout";

interface Props {
  data: Workout;
  exercisesCount: number;
}
export function WorkoutBanner(props: Props) {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <Box
      mt={8}
      mb={10}
      mx={5}
      py={6}
      px={8}
      borderWidth={1}
      rounded={"2xl"}
      borderColor={theme.border[500]}
    >
      <Text fontSize={16} color={theme.textMuted[400]}>
        Active workout
      </Text>
      <Text fontFamily={"Figtree_600SemiBold"} fontSize={24} color={theme.text}>
        {props.data.name}
      </Text>
      <HStack mt={3} alignItems={"center"} space={3}>
        <Text fontSize={16} color={theme.textMuted[500]}>
          {props.exercisesCount + " exercise(s)"}
        </Text>
        <Circle size={1} bgColor={theme.textMuted[500]}></Circle>
        <Text fontSize={16} color={theme.textMuted[500]}>
          {props.data.splits.length + " split(s)"}
        </Text>
      </HStack>
      <IconButton
        position={"absolute"}
        top={4}
        right={4}
        size={"md"}
        rounded={"xl"}
        bgColor={theme.background[400]}
        onPress={() => router.push("/playlists/searchPlaylists")}
        _icon={{
          as: MaterialCommunityIcons,
          name: "arrow-expand",
          color: theme.text,
        }}
      />
    </Box>
  );
}
