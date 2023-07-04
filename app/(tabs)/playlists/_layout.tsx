import { FontAwesome5 } from "@expo/vector-icons";
import { Stack, Tabs, useRouter } from "expo-router";
import { IconButton } from "native-base";

export default function PlaylistsLayout() {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Playlist",
          headerRight: () => (
            <IconButton onPress={() => router.push("/playlists/create")} mt={1}>
              <FontAwesome5 name="plus" size={18} />
            </IconButton>
          ),
        }}
      />
      {/* <Stack.Screen name="configure" options={{ headerTitle: "Configure" }} /> */}
      <Stack.Screen
        name="create"
        options={{ headerTitle: "Create Playlist", presentation: "modal" }}
      />
      <Stack.Screen
        name="exercises"
        options={{ headerTitle: "Add Exercise", presentation: "modal" }}
      />
      <Stack.Screen
        name="steps"
        options={{ headerShown: false, presentation: "modal" }}
      />
    </Stack>
  );
}
