import { Link, Tabs, useRouter } from "expo-router";
import AppBar from "../../components/AppBar";
import Colors from "../../constants/Colors";
import { Ionicons, FontAwesome5, FontAwesome } from "@expo/vector-icons/";
import { IconButton } from "native-base";
import { useAuth } from "../../context/auth";

export default function TabsLayout() {
  const { signOut } = useAuth();
  const router = useRouter();

  const openModal = () => {
    router.push("createPlaylistModal");
  };

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: Colors["primary"].background,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Activity",
          headerTitleAlign: "center",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="home"
              color={focused ? "#fff" : "#828282"}
              size={20}
            />
          ),
          header: ({ options }) => (
            <AppBar
              title={options.title}
              left={
                <IconButton
                  onPress={signOut}
                  icon={<FontAwesome name="sign-out" size={30} />}
                ></IconButton>
              }
            />
          ),
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="playlists"
        options={{
          title: "Playlists",
          headerTitleAlign: "center",
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="dumbbell"
              color={focused ? "#fff" : "#828282"}
              size={20}
            />
          ),
          header: ({ options }) => (
            <AppBar
              title={options.title}
              left={
                <IconButton
                  onPress={openModal}
                  icon={<FontAwesome name="plus" size={30} />}
                ></IconButton>
              }
            />
          ),
        }}
      ></Tabs.Screen>
    </Tabs>
  );
}
