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
import Colors from "../../../../constants/Colors";
import { useAuth } from "../../../../context/auth";
import { Split, Workout } from "../../../../models/workout";
import Dictionary from "../../../../models/dictionary";
import { formatDataSnapshot } from "../../../../utils/utils";
import { Exercise } from "../../../../models/exercise";

interface SplitData {
  id: string;
  title: string;
  exercises: string[];
}

export default function SplitDetails() {
  const { id, workoutId } = useGlobalSearchParams() as {
    id: string;
    workoutId: string;
  };
  const { user } = useAuth();
  const router = useRouter();

  const [split, setSplit] = useState<Split | null>(null);

  useEffect(() => {
    if (id && workoutId) {
      db()
        .ref(`/users/${user.uid}/workouts/${workoutId}/splits/${id}`)
        .once("value")
        .then((snapshot) => {
          const data: SplitData = snapshot.val();
          if (data) {
            let split: Split = {
              id: data.id,
              title: data.title,
              exercises: [],
            };

            getSplitExercises(data.exercises).then((exercises) => {
              console.log(exercises);
              split.exercises = exercises;
              setSplit(split);
            });
          }
        });
    }
  }, [id, workoutId]);

  const getSplitExercises = async (exercisesId: string[]) => {
    let exercises: Exercise[] = [];
    for (const eId of exercisesId) {
      const snapshot = await db()
        .ref(`/users/${user.uid}/exercises/${eId}`)
        .once("value");

      const exercise: Exercise = snapshot.val();
      exercises.push(exercise);
    }
    return exercises;
  };

  return (
    <View>
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors["primary"].fundo },
          headerTitle: `${split ? "Split " + split.title : ""}`,
        }}
      />

      {split && (
        <>
          {split.exercises.length > 0 && (
            <FlatList
              mt={-2}
              data={split.exercises}
              renderItem={({ item }) => (
                <>
                  <Pressable
                    key={item.id}
                    // onPress={() => router.push(`/split/${item.id}`)}
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
                            <Text>{item.name}</Text>
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
