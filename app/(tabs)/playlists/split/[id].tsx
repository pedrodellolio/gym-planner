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
import { useTheme } from "../../../../context/theme";
import { FlatListItem } from "../../../../components/themed/FlatListItem";

export default function SplitDetails() {
  const { id, workoutId } = useGlobalSearchParams() as {
    id: string;
    workoutId: string;
  };
  const { user } = useAuth();
  const { theme } = useTheme();
  const router = useRouter();

  const [title, setTitle] = useState<string | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    if (id && workoutId) {
      db()
        .ref(`/users/${user.uid}/workouts/${workoutId}/splits/${id}`)
        .once("value")
        .then((snapshot) => {
          const data = snapshot.val();
          if (data) {
            setTitle(data.title);
            getSplitExercises(data.exercises).then((exercises) => {
              setExercises(exercises);
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
      exercises.push({ ...exercise, id: eId });
    }
    return exercises;
  };

  return (
    <View py={5} px={6}>
      <Stack.Screen
        options={{
          headerTitleStyle: {
            fontFamily: "Figtree_700Bold",
          },
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: theme.background[500] },
          headerTitle: `${title ? "Split " + title : ""}`,
        }}
      />

      {exercises.length > 0 && (
        <>
          {exercises.length > 0 && (
            <FlatList
              mt={-2}
              data={exercises}
              renderItem={({ item, index }) => (
                <>
                  <FlatListItem
                    item={item}
                    // onPress={() => router.push(`/exercises/${item.id}`)}
                    // onLongPress={() => showDetails(item.id)}
                  />
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
