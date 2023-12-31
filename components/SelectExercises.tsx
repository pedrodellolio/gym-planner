import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { FirebaseDatabaseTypes } from "@react-native-firebase/database";
import {
  Actionsheet,
  Box,
  Button,
  Center,
  Checkbox,
  FlatList,
  HStack,
  Icon,
  IconButton,
  Pressable,
} from "native-base";
import { useState } from "react";
import { Exercise } from "../models/exercise";
import Dictionary from "../models/dictionary";
import { formatDataSnapshot } from "../utils/utils";
import { useAuth } from "../context/auth";
import { useEffect } from "react";
import db from "@react-native-firebase/database";
import { SplitData } from "../app/(tabs)/playlists/settingWorkout";
import { useTheme } from "../context/theme";
import { Text } from "./themed/Text";
import { Input } from "./themed/Input";

interface Props {
  splitId: number;
  formData: SplitData[];
  setFormData: React.Dispatch<React.SetStateAction<SplitData[]>>;
  onClose: () => void;
  isOpen: boolean;
}

export default function SelectExercises(props: Props) {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [qryLimit, setQryLimit] = useState(10);
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);

  useEffect(() => {
    const split = props.formData.find((f) => f.id === props.splitId);
    setSelectedExercises(split.exercises.map((e) => e.id));
  }, [props.isOpen]);

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

  const findExerciseById = async (exerciseId: string) => {
    const snapshot = await db()
      .ref(`/users/${user.uid}/exercises/${exerciseId}`)
      .once("value");

    const exercise: Exercise = snapshot.val();
    exercise.id = exerciseId;
    return exercise;
  };

  const updateFormData = async () => {
    let split = { id: props.splitId, exercises: selectedExercises };

    //search for exercise id in db
    let exercises: Exercise[] = [];
    for (const eId of split.exercises) {
      const exerciseDb = await findExerciseById(eId);
      exercises.push(exerciseDb);
    }

    // update formData with exercises for specific split of id split.id
    const updatedFormData = props.formData.map((item) => {
      if (item.id === split.id) {
        return { ...item, exercises };
      }
      return item;
    });
    props.setFormData(updatedFormData);
    props.onClose();
  };

  const updateSelectedExercises = (selected: boolean, exerciseId: string) => {
    if (selected) setSelectedExercises((prev) => [...prev, exerciseId]);
    else
      setSelectedExercises((prevExercises) =>
        prevExercises.filter((id) => id !== exerciseId)
      );
  };

  return (
    <Center>
      <Actionsheet
        borderWidth={1}
        isOpen={props.isOpen}
        onClose={props.onClose}
      >
        <Actionsheet.Content bgColor={theme.background[500]}>
          <Box w="100%" h={"full"}>
            <Box h={"100%"} px={4}>
              <Text>Exercises</Text>
              <HStack alignItems="center">
                <Input
                  placeholder="Search Exercises"
                  // width={"90%"}
                  borderColor={theme.border[500]}
                  focusOutlineColor={theme.tint[500]}
                  py="3"
                  px="1"
                  mt={2}
                  fontSize="14"
                  InputLeftElement={
                    <Icon
                      m="2"
                      ml="3"
                      size="6"
                      color="gray.400"
                      as={<MaterialIcons name="search" />}
                    />
                  }
                />
              </HStack>

              <FlatList
                mt={3}
                data={exercises}
                renderItem={({ item }) => (
                  <Pressable
                    key={item.id}
                    borderBottomWidth="1"
                    borderColor={theme.background[400]}
                    pl={["0", "4"]}
                    pr={["0", "5"]}
                    py="4"
                  >
                    <Checkbox
                      onChange={(selected) =>
                        updateSelectedExercises(selected, item.id)
                      }
                      value={item.id}
                      color={theme.text}
                    >
                      <Text pl={2} color={theme.text} fontSize={16}>
                        {item.name}
                      </Text>
                    </Checkbox>
                    {/* <MaterialIcons
                      name={
                        selectedExercises.includes(item.id)
                          ? "check-box"
                          : "check-box-outline-blank"
                      }
                      size={24}
                      color={theme.tint[500]}
                    />
                    <Text></Text> */}
                    {/* <Checkbox.Group
                      colorScheme="green"
                      accessibilityLabel="pick an item"
                      value={selectedExercises}
                      onChange={(values) => {
                        const updatedSelectedExercises = [
                          ...selectedExercises,
                          ...values,
                        ];
                        console.log(updatedSelectedExercises); // setSelectedExercises((prev) => [...prev, values])
                        setSelectedExercises(updatedSelectedExercises);
                      }}
                    >
                      <Checkbox value={item.id}>{item.name}</Checkbox>
                    </Checkbox.Group> */}
                    {/* <Checkbox.Group
                      onChange={setSelectedExercises}
                      value={selectedExercises}
                      accessibilityLabel="choose numbers"
                    >
                      <Checkbox value={item.id}>{item.name}</Checkbox>
                    </Checkbox.Group> */}
                  </Pressable>
                )}
                keyExtractor={(item, index) => {
                  return String(index);
                }}
              />
              {selectedExercises.length > 0 && (
                <Box bgColor={theme.background[500]} p={4} mb={10} w="100%">
                  <Button px={4} onPress={updateFormData}>
                    Add
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        </Actionsheet.Content>
      </Actionsheet>
    </Center>
  );
}
