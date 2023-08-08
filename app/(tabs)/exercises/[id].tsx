import { Stack, useGlobalSearchParams, useRouter } from "expo-router";
import {
  Box,
  HStack,
  Icon,
  IconButton,
  Square,
  VStack,
  View,
} from "native-base";
import { useEffect, useState } from "react";
import db from "@react-native-firebase/database";
import Colors from "../../../constants/Colors";
import { useAuth } from "../../../context/auth";
import { Exercise } from "../../../models/exercise";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useTheme } from "../../../context/theme";
import { Text } from "../../../components/themed/Text";

export default function ExerciseDetails() {
  const { id } = useGlobalSearchParams() as { id: string };
  const { user } = useAuth();
  const { theme, colorScheme } = useTheme();
  const router = useRouter();

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
              headerTitleStyle: {
                color: theme.white,
                fontFamily: "Figtree_700Bold",
              },
              headerTransparent: true,
              headerTitleAlign: "center",
              contentStyle: { backgroundColor: theme.tint[400] },
              headerLeft: () => (
                <IconButton
                  backgroundColor={theme.tint[300]}
                  size={"lg"}
                  rounded={"lg"}
                  onPress={() => router.back()}
                  _icon={{
                    as: FontAwesome5,
                    name: "arrow-left",
                    size: 5,
                    color: theme.text,
                  }}
                />
              ),
              headerRight: () => (
                <Square
                  alignSelf={"flex-end"}
                  rounded={"lg"}
                  size={10}
                  bgColor={theme.tint[500]}
                >
                  <Text color={theme.white} fontWeight={700}>
                    {exercise.equipmentNumber ?? "00"}
                  </Text>
                </Square>
              ),
            }}
          />
          <Box w={"full"} h={"150px"}></Box>
          <VStack
            bgColor={theme.background[500]}
            h="full"
            roundedTop={20}
            space={5}
            px={5}
          >
            <HStack alignItems={"center"} space={3} mt={10}>
              <Square
                alignSelf={"flex-end"}
                rounded={"lg"}
                size={12}
                bgColor={theme.tint[400]}
              >
                <MaterialCommunityIcons
                  size={24}
                  name="dumbbell"
                  color={
                    colorScheme === "dark" ? theme.black[500] : theme.white
                  }
                />
              </Square>
              <Box>
                <Text
                  fontWeight={400}
                  fontSize={16}
                  color={theme.textMuted[400]}
                >
                  Sets
                </Text>
                <Text fontWeight={500} fontSize={18}>
                  {exercise.sets}
                </Text>
              </Box>
            </HStack>

            <HStack alignItems={"center"} space={3}>
              <Square
                alignSelf={"flex-end"}
                rounded={"lg"}
                size={12}
                bgColor={theme.tint[400]}
              >
                <MaterialCommunityIcons
                  size={24}
                  name="repeat"
                  color={
                    colorScheme === "dark" ? theme.black[500] : theme.white
                  }
                />
              </Square>
              <Box>
                <Text
                  fontWeight={400}
                  fontSize={16}
                  color={theme.textMuted[400]}
                >
                  Reps
                </Text>
                <Text fontWeight={500} fontSize={18}>
                  {exercise.reps}
                </Text>
              </Box>
            </HStack>

            <HStack alignItems={"center"} space={3}>
              <Square
                alignSelf={"flex-end"}
                rounded={"lg"}
                size={12}
                bgColor={theme.tint[400]}
              >
                <MaterialCommunityIcons
                  size={24}
                  name="timer"
                  color={
                    colorScheme === "dark" ? theme.black[500] : theme.white
                  }
                />
              </Square>
              <Box>
                <Text
                  fontWeight={400}
                  fontSize={16}
                  color={theme.textMuted[400]}
                >
                  Rest
                </Text>
                <Text fontWeight={500} fontSize={18}>
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
                  bgColor={theme.tint[400]}
                >
                  <MaterialCommunityIcons
                    size={24}
                    name="weight"
                    color={
                      colorScheme === "dark" ? theme.black[500] : theme.white
                    }
                  />
                </Square>
                <Box>
                  <Text
                    fontWeight={400}
                    fontSize={16}
                    color={theme.textMuted[400]}
                  >
                    Weight
                  </Text>
                  <Text fontWeight={500} fontSize={18}>
                    {exercise.weight + "kg"}
                  </Text>
                </Box>
              </HStack>
            ) : null}
          </VStack>
        </SafeAreaView>
      )}
    </>
  );
}
