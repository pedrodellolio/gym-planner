import { Stack, useGlobalSearchParams } from "expo-router";
import { Text, View } from "native-base";

export default function PlaylistDetails() {
  const { id } = useGlobalSearchParams();

  return (
    <View>
      <Stack.Screen options={{ headerTitle: `Details #${id}` }} />
      <Text>My details for: {id}</Text>
    </View>
  );
}
