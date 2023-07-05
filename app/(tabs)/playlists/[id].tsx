import { Stack, useGlobalSearchParams, useRouter } from "expo-router";
import {
  Box,
  Button,
  Divider,
  FlatList,
  Flex,
  HStack,
  Pressable,
  Text,
  VStack,
  View,
} from "native-base";
import { useEffect, useState } from "react";
import db from "@react-native-firebase/database";
import { useAuth } from "../../../context/auth";
import Dictionary from "../../../models/dictionary";
import { Split, Workout } from "../../../models/workout";
import { formatDataSnapshot } from "../../../utils/utils";
import Colors from "../../../constants/Colors";

interface WorkoutData {
  id: string;
  name: string;
  splits: Dictionary<Split>;
}

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
        const data: WorkoutData = snapshot.val();
        if (data) {
          console.log(data);
          const dictionary: Dictionary<Split> = data.splits;
          let workout: Workout = { id: data.id, name: data.name, splits: [] };
          if (dictionary) {
            const splits = formatDataSnapshot(dictionary) as Split[];
            workout.splits = splits;
          }
          setPlaylist(workout);
        }
      });
  }, [id]);

  return (
    <View>
      {playlist && (
        <>
          <Stack.Screen
            options={{
              headerShadowVisible: false,
              headerStyle: { backgroundColor: Colors["primary"].fundo },
              headerTitle: `${playlist.name}`,
            }}
          />
          {playlist.splits.length === 0 ? (
            <Flex justifyContent="center" alignItems="center" h="full">
              <Box w={"64"}>
                <Text mb={2} textAlign={"center"} fontSize={16}>
                  Let's start setting your workout
                </Text>
                <Button
                  onPress={() =>
                    router.push({
                      pathname: `/playlists/steps`,
                      params: { playlistId: id },
                    })
                  }
                  w={"100%"}
                >
                  Configure
                </Button>
              </Box>
            </Flex>
          ) : (
            <FlatList
              mt={-2}
              data={playlist.splits.sort((a, b) =>
                a.title.localeCompare(b.title)
              )}
              renderItem={({ item }) => (
                <>
                  <Pressable
                    key={item.id}
                    onPress={() =>
                      router.push({
                        pathname: `/playlists/split/${item.id}`,
                        params: { workoutId: id },
                      })
                    }
                    // onLongPress={() => showDetails(item.id)}
                    px={5}
                    py={3}
                  >
                    {({ isPressed }) => {
                      return (
                        <HStack
                          style={{
                            transform: [
                              {
                                scale: isPressed ? 0.99 : 1,
                              },
                            ],
                          }}
                          space={[2, 3]}
                          justifyContent="space-between"
                        >
                          <VStack>
                            <Text>Split {item.title}</Text>
                          </VStack>
                        </HStack>
                      );
                    }}
                  </Pressable>
                  <Divider />
                </>
              )}
              keyExtractor={(item) => item.id}
            />
          )}
        </>
      )}
    </View>
  );
}
