import { Stack, Tabs } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerTitle: "Activity" }} />
    </Stack>
  );
}
