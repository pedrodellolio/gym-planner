import {
  Pressable,
  HStack,
  VStack,
  ScrollView,
  FlatList,
  Divider,
} from "native-base";
import { Stack, useRouter } from "expo-router";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import UserIcon from "../../components/UserIcon";
import { useTheme } from "../../context/theme";
import { Text } from "../../components/themed/Text";
import { useState, useEffect } from "react";
import { ButtonTabs } from "../../components/themed/ButtonTabs";
import { WorkoutBanner } from "../../components/themed/WorkoutBanner";
import { useAuth } from "../../context/auth";
import db, { FirebaseDatabaseTypes } from "@react-native-firebase/database";
import { Split, Workout } from "../../models/workout";
import { documentToObject } from "../../utils/utils";
import { Exercise } from "../../models/exercise";

interface ExerciseData extends Exercise {
  split: any;
}

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();
  const { theme, colorScheme } = useTheme();

  const [selectedSplit, setSelectedSplit] = useState("A");
  const [activeWorkout, setActiveWorkout] = useState<Workout | null>();
  const [exercises, setExercises] = useState<ExerciseData[]>([]);

  useEffect(() => {
    if (user) {
      const refPath = `/users/${user.uid}/workouts/`;
      db()
        .ref(refPath)
        .orderByChild("active")
        .equalTo(true)
        .limitToFirst(1)
        .on("value", onActiveWorkoutChange);
      return () => db().ref(refPath).off("value", onActiveWorkoutChange);
    }
  }, []);

  const onActiveWorkoutChange = async (
    snapshot: FirebaseDatabaseTypes.DataSnapshot
  ) => {
    const workout = organizeWorkout(snapshot);
    setActiveWorkout(workout);

    const exercises = await fetchWorkoutExercises(workout.splits);
    setExercises(exercises);
  };

  const organizeWorkout = (snapshot: FirebaseDatabaseTypes.DataSnapshot) => {
    //create workout/splits objects from workout/splits document
    const workout: Workout = documentToObject<Workout>(snapshot.val());
    let splits = Object.entries(workout.splits).map((split) => {
      const key = split[0];
      const value = split[1];
      return documentToObject<Split>({ [key]: value });
    });
    return { ...workout, splits: splits };
  };

  const fetchWorkoutExercises = async (splits: Split[]) => {
    //fetch exercises from split.exercises (list of ids)
    const exercises: ExerciseData[] = [];
    for (const split of splits) {
      for (const eId of split.exercises) {
        const snapshot = await db()
          .ref(`/users/${user.uid}/exercises/${eId}`)
          .once("value");

        const exercise = snapshot.val();
        exercises.push({ ...exercise, split: split.title });
      }
    }

    return exercises;
  };

  const options = {
    headerShadowVisible: false,
    title: "Your Training",
    headerStyle: {
      backgroundColor: theme.background[500],
    },
    headerTitleStyle: {
      fontFamily: "Figtree_700Bold",
    },
  };

  return (
    <ScrollView
      stickyHeaderIndices={[2]}
      alwaysBounceVertical={false}
      overScrollMode="never"
      bounces={false}
    >
      <Stack.Screen
        options={{
          ...options,
          headerTitleAlign: "center",
          headerLeft: () => (
            <Pressable onPress={() => router.push("/profile")}>
              <UserIcon
                size={"xs"}
                rounded={"xl"}
                marginLeft={5}
                marginRight={1}
              />
            </Pressable>
          ),
        }}
      />
      {activeWorkout && exercises && (
        <>
          <WorkoutBanner
            data={activeWorkout}
            exercisesCount={exercises.length}
          />

          <ButtonTabs
            selectedValue={selectedSplit}
            setSelectedValue={setSelectedSplit}
            data={activeWorkout}
          />

          <FlatList
            data={exercises.filter((e) => e.split === selectedSplit)}
            renderItem={({ item }) => (
              <>
                <VStack mx={8} space={2} my={6}>
                  <Text
                    fontFamily={"Figtree_600SemiBold"}
                    color={theme.tint[400]}
                    fontSize={18}
                  >
                    {item.name}
                  </Text>
                  <HStack space={8}>
                    <HStack space={2} alignItems="center">
                      <FontAwesome
                        name="repeat"
                        size={16}
                        color={theme.textMuted[500]}
                      />
                      <Text color={theme.textMuted[500]} fontSize={16}>
                        {item.sets + "x" + item.reps}
                      </Text>
                    </HStack>
                    <HStack space={2} alignItems="center">
                      <MaterialIcons
                        name="timer"
                        size={16}
                        color={theme.textMuted[500]}
                      />
                      <Text color={theme.textMuted[500]} fontSize={16}>
                        {item.restIntervalInSeconds + "s"}
                      </Text>
                    </HStack>
                  </HStack>
                </VStack>
                <Divider bgColor={theme.border[400]} />
              </>
            )}
            keyExtractor={(item) => item.id}
          />
        </>
      )}
    </ScrollView>
  );
}
