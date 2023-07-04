import { Stack, useGlobalSearchParams, useRouter } from "expo-router";
import { Box, Square, Text, VStack, View } from "native-base";
import { useEffect, useState } from "react";
import db from "@react-native-firebase/database";
import Colors from "../../../constants/Colors";
import { useAuth } from "../../../context/auth";
import { Exercise } from "../../../models/exercise";

export default function ExerciseDetails() {
  const { id } = useGlobalSearchParams() as { id: string };
  const { user } = useAuth();

  const [exercise, setExercise] = useState<Exercise | null>(null);

  useEffect(() => {
    db()
      .ref(`/users/${user.uid}/exercises/${id}`)
      .once("value")
      .then((snapshot) => {
        const exercise: Exercise = snapshot.val();
        if (exercise) {
          exercise.id = id;
          setExercise(exercise);
        }
      });
  }, [id]);

  return (
    <>
      {exercise && (
        <View>
          <Stack.Screen
            options={{
              headerShadowVisible: false,
              headerStyle: { backgroundColor: Colors["primary"].fundo },
              headerTitle: `${exercise.name}`,
            }}
          />
          <VStack space={3} px={5}>
            {exercise.equipmentNumber && (
              <Square
                alignSelf={"flex-end"}
                rounded={"lg"}
                size={10}
                bgColor={"gray.400"}
              >
                {exercise.equipmentNumber}
              </Square>
            )}
            <Box>
              <Text>Sets</Text>
              <Text>{exercise.sets}</Text>
            </Box>
            <Box>
              <Text>Reps</Text>
              <Text>{exercise.reps}</Text>
            </Box>
            <Box>
              <Text>Rest</Text>
              <Text>{exercise.restIntervalInSeconds}s</Text>
            </Box>

            {exercise.weight && (
              <Box>
                <Text>Weight</Text>
                <Text>{exercise.weight}</Text>
              </Box>
            )}
          </VStack>
        </View>
      )}
    </>
  );
}
