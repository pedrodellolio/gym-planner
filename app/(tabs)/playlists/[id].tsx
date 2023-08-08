import { Stack, useGlobalSearchParams, useRouter } from "expo-router";
import {
  Box,
  FlatList,
  Flex,
  HStack,
  Pressable,
  VStack,
  View,
} from "native-base";
import { useEffect, useState } from "react";
import db from "@react-native-firebase/database";
import { useAuth } from "../../../context/auth";
import Dictionary from "../../../models/dictionary";
import { Split, Workout } from "../../../models/workout";
import { formatDataSnapshot } from "../../../utils/utils";
import { useTheme } from "../../../context/theme";
import { Text } from "../../../components/themed/Text";
import { Button } from "../../../components/themed/Button";

interface WorkoutData {
  id: string;
  name: string;
  splits: Dictionary<Split>;
}

export default function PlaylistDetails() {
  const { id } = useGlobalSearchParams() as { id: string };
  const { user } = useAuth();
  const { theme } = useTheme();

  const router = useRouter();

  const [playlist, setPlaylist] = useState<Workout | null>(null);

  useEffect(() => {
    db()
      .ref(`/users/${user.uid}/workouts/${id}`)
      .once("value")
      .then((snapshot) => {
        const data: WorkoutData = snapshot.val();
        if (data) {
          const dictionary: Dictionary<Split> = data.splits;
          let workout: Workout = {
            id: data.id,
            name: data.name,
            splits: [],
            active: false,
          };
          if (dictionary) {
            const splits = formatDataSnapshot(dictionary) as Split[];
            workout.splits = splits;
          }
          setPlaylist(workout);
        }
      });
  }, [id]);

  return (
    <View py={5} px={6}>
      {playlist && (
        <>
          <Stack.Screen
            options={{
              headerTitleStyle: {
                fontFamily: "Figtree_700Bold",
              },
              headerTitleAlign: "center",
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: theme.background[500],
              },
              headerTitle: `${playlist.name}`,
            }}
          />
          {playlist.splits.length === 0 ? (
            <Flex justifyContent="center" alignItems="center" h="full">
              <Box w={"72"}>
                <Text style={{ marginBottom: 2, textAlign: "center" }}>
                  Let's start setting your workout
                </Text>
                <Button
                  title="Configure"
                  mt={5}
                  variant={"solid"}
                  onPress={() =>
                    router.push({
                      pathname: `/playlists/settingWorkout`,
                      params: { playlistId: id },
                    })
                  }
                  w={"100%"}
                />
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
                    borderColor={theme.border[400]}
                    borderBottomWidth="1"
                    pl={["0", "5"]}
                    pr={["0", "5"]}
                    py="5"
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
                            <Text fontSize={16}>Split {item.title}</Text>
                          </VStack>
                        </HStack>
                      );
                    }}
                  </Pressable>
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
