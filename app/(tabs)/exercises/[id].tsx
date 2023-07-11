import { Stack, useGlobalSearchParams, useRouter } from "expo-router";
import { Box, HStack, Square, VStack, View } from "native-base";
import { useEffect, useState } from "react";
import db from "@react-native-firebase/database";
import Colors from "../../../constants/Colors";
import { useAuth } from "../../../context/auth";
import { Exercise } from "../../../models/exercise";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../../../context/theme";
import { Text } from "../../../components/themed/Text";

export default function ExerciseDetails() {
  const { id } = useGlobalSearchParams() as { id: string };
  const { user } = useAuth();
  const { theme } = useTheme();

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
        <SafeAreaView>
          <Stack.Screen
            options={{
              headerShadowVisible: false,
              headerTitle: `${exercise.name}`,
              headerTitleStyle: { color: theme.white },
              headerTransparent: true,
              contentStyle: { backgroundColor: theme.tint[500] },
              headerRight: () => (
                <Square
                  alignSelf={"flex-end"}
                  rounded={"lg"}
                  size={8}
                  bgColor={theme.tint[600]}
                >
                  <Text style={{ color: theme.white, fontWeight: "bold" }}>
                    {exercise.equipmentNumber ?? "00"}
                  </Text>
                </Square>
              ),
            }}
          />
          <Box w={"full"} h={"150px"}></Box>
          <VStack bgColor={"#fff"} h="full" roundedTop={20} space={5} px={5}>
            <HStack alignItems={"center"} space={3} mt={10}>
              <Square
                alignSelf={"flex-end"}
                rounded={"lg"}
                size={12}
                bgColor={theme.tint[50]}
              >
                <MaterialCommunityIcons size={24} name="dumbbell" />
              </Square>
              <Box>
                <Text style={{ fontWeight: "400", color: theme.textMuted }}>
                  Sets
                </Text>
                <Text style={{ fontWeight: "500" }}>{exercise.sets}</Text>
              </Box>
            </HStack>

            <HStack alignItems={"center"} space={3}>
              <Square
                alignSelf={"flex-end"}
                rounded={"lg"}
                size={12}
                bgColor={theme.tint[50]}
              >
                <MaterialIcons size={24} name="repeat" />
              </Square>
              <Box>
                <Text style={{ fontWeight: "400", color: theme.textMuted }}>
                  Reps
                </Text>
                <Text style={{ fontWeight: "500" }}>{exercise.reps}</Text>
              </Box>
            </HStack>

            <HStack alignItems={"center"} space={3}>
              <Square
                alignSelf={"flex-end"}
                rounded={"lg"}
                size={12}
                bgColor={theme.tint[50]}
              >
                <MaterialCommunityIcons size={24} name="timer" />
              </Square>
              <Box>
                <Text style={{ fontWeight: "400", color: theme.textMuted }}>
                  Rest
                </Text>
                <Text style={{ fontWeight: "500" }}>
                  {exercise.restIntervalInSeconds + "s"}
                </Text>
              </Box>
            </HStack>

            {exercise.weight ? (
              <HStack alignItems={"center"} space={3}>
                <Square
                  alignSelf={"flex-end"}
                  rounded={"lg"}
                  size={12}
                  bgColor={"indigo.400"}
                >
                  <MaterialCommunityIcons size={24} name="weight" />
                </Square>
                <Box>
                  <Text>Rest</Text>
                  <Text>{exercise.weight + "kg"}</Text>
                </Box>
              </HStack>
            ) : null}
          </VStack>
        </SafeAreaView>
      )}
    </>
  );
}
