import { Slot, Stack, Tabs, useLocalSearchParams } from "expo-router";
import { Circle, HStack, View } from "native-base";
import Colors from "../../../../constants/Colors";

export default function StepsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerTitle: "Setting Workout" }} />
      {/* <Stack.Screen name="split" options={{ headerTitle: "Step two" }} /> */}
    </Stack>
    /* <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: Colors["primary"].fundo,
          },
          tabBarShowLabel: true,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarButton: () => <Circle size="12px" bg="gray.300"></Circle>,
          }}
        ></Tabs.Screen>
      </Tabs> */
  );
}
