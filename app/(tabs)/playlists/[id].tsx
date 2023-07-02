import { Stack, useGlobalSearchParams, useRouter } from "expo-router";
import { Box, Button, Center, Flex, Text, View } from "native-base";
import { useEffect, useState } from "react";
import db from "@react-native-firebase/database";
import Colors from "../../../constants/Colors";
import { useAuth } from "../../../context/auth";
import { Workout } from "../../../models/workout";

export default function PlaylistDetails() {
  const { id } = useGlobalSearchParams() as { id: string };
  const { user } = useAuth();
  const router = useRouter();

  const [playlist, setPlaylist] = useState<Workout | null>(null);

  useEffect(() => {
    db()
      .ref(`/users/${user.uid}/workouts/${id}`)
      .once("value")
      .then((snapshot) => {
        const workout: Workout = snapshot.val();
        if (workout) {
          workout.id = id;
          setPlaylist(workout);
        }
      });
  }, [id]);

  return (
    <View>
      {playlist && (
        <Stack.Screen
          options={{
            headerShadowVisible: false,
            headerStyle: { backgroundColor: Colors["primary"].fundo },
            headerTitle: `${playlist.name}`,
          }}
        />
      )}
      <Flex justifyContent="center" alignItems="center" h="full">
        <Box w={"64"}>
          <Text mb={2} textAlign={"center"} fontSize={16}>
            Let's start setting your workout
          </Text>
          <Button onPress={() => router.push(`/playlists/steps`)} w={"100%"}>
            Configure
          </Button>
        </Box>
      </Flex>
    </View>
  );
}
