import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { Stack, Tabs, useRouter } from "expo-router";
import { HStack, IconButton } from "native-base";
import Colors from "../../../constants/Colors";

export default function PlaylistsLayout() {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          contentStyle: { backgroundColor: Colors["primary"].bg },
          headerShadowVisible: false,
          headerTitle: "Your Workouts",
          headerTitleStyle: {
            fontFamily: "Manrope_700Bold",
          },
          headerStyle: {
            backgroundColor: Colors["primary"].bg,
          },
          // headerLeft: () => (
          //   <UserIcon
          //     size={"xs"}
          //     rounded={"lg"}
          //     marginLeft={1}
          //     marginRight={4}
          //   />
          // ),
          headerRight: () => (
            <HStack>
              <IconButton
                size={"lg"}
                onPress={() => router.push("/playlists/searchPlaylists")}
                _icon={{
                  as: MaterialIcons,
                  name: "search",
                  color: "muted.800",
                }}
              />
              <IconButton
                size="lg"
                onPress={() => router.push("/playlists/create")}
                mt={1}
                _icon={{
                  as: MaterialIcons,
                  name: "playlist-add",
                  color: "muted.800",
                }}
              />
            </HStack>
          ),
        }}
      />
      {/* <Stack.Screen name="configure" options={{ headerTitle: "Configure" }} /> */}
      <Stack.Screen
        name="create"
        options={{
          contentStyle: { backgroundColor: Colors["primary"].bg },
          headerTitle: "Create Playlist",
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="exercises"
        options={{
          contentStyle: { backgroundColor: Colors["primary"].bg },
          headerTitle: "Add Exercise",
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="settingWorkout"
        options={{
          contentStyle: { backgroundColor: Colors["primary"].bg },
          headerTitle: "Setting Workout",
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="searchPlaylists"
        options={{
          contentStyle: { backgroundColor: Colors["primary"].bg },
          headerShown: false,
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
