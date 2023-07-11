import { MaterialIcons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { HStack, IconButton } from "native-base";
import { useTheme } from "../../../context/theme";

function HeaderRight({ theme }) {
  const router = useRouter();

  return (
    <HStack>
      <IconButton
        size={"lg"}
        onPress={() => router.push("/playlists/searchPlaylists")}
        _icon={{
          as: MaterialIcons,
          name: "search",
          color: theme.text,
        }}
      />
      <IconButton
        size="lg"
        onPress={() => router.push("/playlists/create")}
        mt={1}
        _icon={{
          as: MaterialIcons,
          name: "playlist-add",
          color: theme.text,
        }}
      />
    </HStack>
  );
}

export default function PlaylistsLayout() {
  const { theme } = useTheme();

  const options = {
    headerShadowVisible: false,
    headerTitleStyle: {
      fontFamily: "Manrope_700Bold",
      fontSize: 18
    },
    headerStyle: {
      backgroundColor: theme.background[300],
    },
  };

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          ...options,
          headerTitle: "Your Workouts",
          headerRight: () => <HeaderRight theme={theme} />,
        }}
      />
      <Stack.Screen
        name="create"
        options={{
          ...options,
          headerTitle: "Create Playlist",
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="exercises"
        options={{
          ...options,
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="settingWorkout"
        options={{
          ...options,
          headerTitle: "Setting Workout",
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="searchPlaylists"
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
