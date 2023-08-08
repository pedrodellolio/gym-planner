import { MaterialIcons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { HStack, IconButton } from "native-base";
import { useTheme } from "../../../context/theme";

export default function PlaylistsLayout() {
  const { theme } = useTheme();
  const router = useRouter();

  const options = {
    headerShadowVisible: false,
    headerTitleStyle: {
      fontFamily: "Figtree_700Bold",
    },
    headerStyle: {
      backgroundColor: theme.background[500],
    },
  };

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          ...options,
          headerTitle: "Your Workouts",
          headerTitleAlign: "center",
          headerLeft: () => (
            <IconButton
              size={"lg"}
              onPress={() => router.push("/exercises/searchPlaylists")}
              _icon={{
                as: MaterialIcons,
                name: "search",
                color: theme.text,
              }}
            />
          ),
          headerRight: () => (
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
          ),
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
