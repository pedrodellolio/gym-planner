import { FontAwesome5 } from "@expo/vector-icons";
import { Slot, Stack, useRouter } from "expo-router";
import { Button, IconButton } from "native-base";
import Colors from "../../../constants/Colors";

export default function ExercisesLayout() {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitleStyle: {
            fontFamily: "Manrope_700Bold",
          },
          headerStyle: {
            backgroundColor: Colors["primary"].bg,
          },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: Colors["primary"].bg },
          headerTitle: "Exercises",
          headerRight: () => (
            <IconButton onPress={() => router.push("/exercises/create")} mt={1}>
              <FontAwesome5 name="plus" size={18} />
            </IconButton>
          ),
        }}
      />
      <Stack.Screen
        name="create"
        options={{ headerTitle: "Create Exercise", presentation: "modal" }}
      />
    </Stack>
  );
}
