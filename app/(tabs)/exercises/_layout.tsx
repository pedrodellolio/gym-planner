import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { Slot, Stack, useRouter } from "expo-router";
import { Button, HStack, IconButton } from "native-base";
import Colors from "../../../constants/Colors";
import { useTheme } from "../../../context/theme";

function HeaderRight({ theme }) {
  const router = useRouter();

  return (
    <HStack>
      <IconButton
        size={"lg"}
        onPress={() => router.push("/exercises/searchPlaylists")}
        _icon={{
          as: MaterialIcons,
          name: "search",
          color: theme.text,
        }}
      />
      <IconButton
        size="lg"
        onPress={() => router.push("/exercises/create")}
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

export default function ExercisesLayout() {
  const { theme } = useTheme();
  const router = useRouter();

  const options = {
    headerTitleStyle: {
      fontFamily: "Figtree_700Bold",
    },
    headerStyle: {
      backgroundColor: theme.background[500],
    },
    headerShadowVisible: false,
  };

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          ...options,
          headerTitle: "Exercises",
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
              onPress={() => router.push("/exercises/create")}
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
          headerTitle: "Create Exercise",
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
