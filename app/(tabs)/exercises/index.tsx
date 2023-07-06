import {
  Text,
  FlatList,
  HStack,
  VStack,
  View,
  Pressable,
  Actionsheet,
  Box,
  useDisclose,
  Center,
  Button,
} from "native-base";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { FirebaseDatabaseTypes } from "@react-native-firebase/database";
import db from "@react-native-firebase/database";
import { useAuth } from "../../../context/auth";
import { formatDataSnapshot } from "../../../utils/utils";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import Dictionary from "../../../models/dictionary";
import { Exercise } from "../../../models/exercise";
import { SvgXml } from "react-native-svg";
import { WorkingOutUndrawXml } from "../../../components/svg/Xml";

export default function Exercises() {
  const { user } = useAuth();
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclose();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [qryLimit, setQryLimit] = useState(5);
  const [selectedExerciseId, setSelectedExerciseId] = useState<string | null>();

  useEffect(() => {
    const refPath = `/users/${user.uid}/exercises`;
    db()
      .ref(refPath)
      .orderByKey()
      .limitToLast(qryLimit)
      .on("value", onExerciseChange);

    return () => db().ref(refPath).off("value", onExerciseChange);
  }, [qryLimit]);

  const onExerciseChange = (snapshot: FirebaseDatabaseTypes.DataSnapshot) => {
    const dictionary: Dictionary<Exercise> = snapshot.val();
    if (dictionary) {
      const values = formatDataSnapshot(dictionary) as Exercise[];
      setExercises(values);
    } else setExercises([]);
  };

  const deleteWorkout = async (id: string) => {
    const refPath = `/users/${user.uid}/workouts/${id}`;
    await db().ref(refPath).remove();
    onClose();
  };

  const showDetails = (id: string) => {
    setSelectedExerciseId(id);
    onOpen();
  };

  return (
    <View p={5}>
      {exercises.length > 0 ? (
        <FlatList
          data={exercises}
          renderItem={({ item }) => (
            <Pressable
              key={item.id}
              onPress={() => router.push(`/exercises/${item.id}`)}
              onLongPress={() => showDetails(item.id)}
              borderBottomWidth="1"
              borderColor="muted.800"
              pl={["0", "5"]}
              pr={["0", "5"]}
              py="3"
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
                      <Text>{item.id}</Text>
                      <Text>{item.name}</Text>
                    </VStack>
                    {/* <Spacer /> */}
                  </HStack>
                );
              }}
            </Pressable>
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <VStack alignItems={"center"} space={5}>
          <Center alignSelf={"center"} mt={20} w={"200px"} h={"250px"}>
            <SvgXml xml={WorkingOutUndrawXml} width="100%" height="100%" />
          </Center>
          <Text fontSize={"md"} color={"muted.500"}>
            You don't have any exercises yet
          </Text>
          <Button
            colorScheme={"indigo"}
            onPress={() => router.push("/exercises/create")}
          >
            Create new exercise
          </Button>
        </VStack>
      )}

      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          {/* <Actionsheet.Item onPress={() => router.push("")}>Edit</Actionsheet.Item> */}
          <Actionsheet.Item onPress={() => deleteWorkout(selectedExerciseId)}>
            Delete
          </Actionsheet.Item>
          <Actionsheet.Item onPress={onClose}>Cancel</Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </View>
  );
}

const styles = StyleSheet.create({});
