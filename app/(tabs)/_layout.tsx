import { Tabs, usePathname, useRouter } from "expo-router";
import Colors from "../../constants/Colors";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons/";
import { useAuth } from "../../context/auth";

export default function TabsLayout() {
  const { signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const openModal = () => {
    router.push("createPlaylistModal");
  };

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: Colors["primary"].background,
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
              color={focused ? "#fff" : "#828282"}
              size={20}
            />
          ),
        }}
      ></Tabs.Screen>

      <Tabs.Screen
        name="playlists"
        options={{
          headerShown: false,
          tabBarShowLabel: false,

          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="dumbbell"
              color={focused ? "#fff" : "#828282"}
              size={20}
            />
          ),
        }}
      ></Tabs.Screen>

      <Tabs.Screen
        name="exercises"
        options={{
          headerShown: false,
          tabBarShowLabel: false,

          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="search"
              color={focused ? "#fff" : "#828282"}
              size={20}
            />
          ),
        }}
      ></Tabs.Screen>
    </Tabs>
  );
}
