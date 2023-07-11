import { Tabs, usePathname, useRouter } from "expo-router";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons/";
import { useColorScheme } from "react-native";
import Colors from "../../constants/Colors";
import { useThemeColor } from "../../components/Themed";
import { useTheme } from "../../context/theme";

export default function TabsLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, colorScheme } = useTheme();

  const openModal = () => {
    router.push("createPlaylistModal");
  };

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor:
            colorScheme === "light" ? theme.black : theme.background[400],
          height: 55,
        },
        tabBarShowLabel: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Activity",
          headerShown: true,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="home"
              color={focused ? theme.white : theme.textMuted}
              size={20}
            />
          ),
        }}
      ></Tabs.Screen>

      <Tabs.Screen
        name="playlists"
        options={{
          title: "Workouts",
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="dumbbell"
              color={focused ? theme.white : theme.textMuted}
              size={20}
            />
          ),
        }}
      ></Tabs.Screen>

      <Tabs.Screen
        name="exercises"
        options={{
          title: "Exercises",
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="search"
              color={focused ? theme.white : theme.textMuted}
              size={20}
            />
          ),
        }}
      ></Tabs.Screen>
    </Tabs>
  );
}
