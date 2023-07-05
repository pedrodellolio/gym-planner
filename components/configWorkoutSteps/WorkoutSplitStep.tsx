import {
  Box,
  Button,
  Divider,
  FlatList,
  HStack,
  Pressable,
  Text,
  VStack,
  View,
  useDisclose,
} from "native-base";
import { SPLIT_ORDER } from "../../models/workout";
import { SplitData } from "../../app/(tabs)/playlists/steps";
import { useState } from "react";
import SelectExercises from "../SelectExercises";
import { useAuth } from "../../context/auth";
import db from "@react-native-firebase/database";
import { useRouter } from "expo-router";

interface Props {
  formData: SplitData[];
  setFormData: React.Dispatch<React.SetStateAction<SplitData[]>>;
  selectedSplitTypeId: number;
  playlistId: string;
  currentStep: number;
  updateCurrentStep: (value: number) => void;
}

export default function WorkoutSplitStep(props: Props) {
  const router = useRouter();
  const { onOpen, onClose, isOpen } = useDisclose();
  const { user } = useAuth();
  const [splitId, setSplitId] = useState(0);

  const handleOpenModal = (splitId: number) => {
    setSplitId(splitId);
    onOpen();
  };

  const saveSplitInfo = () => {
    try {
      for (const split of props.formData) {
        const ids = split.exercises.map((e) => e.id);
        db()
          .ref(`/users/${user.uid}/workouts/${props.playlistId}/splits/`)
          .push({
            title: SPLIT_ORDER[split.id],
            exercises: ids,
          });
      }

      router.replace("/playlists");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View>
      <Box mt={10}>
        <VStack space={10}>
          {props.formData.map((split) => {
            return (
              <VStack key={split.id} space={3}>
                <Box bgColor={"gray.300"} p={3}>
                  <Text>Split {SPLIT_ORDER[split.id]}</Text>
                </Box>
                <FlatList
                  mt={-2}
                  data={split.exercises}
                  renderItem={({ item }) => (
                    <>
                      <Pressable
                        key={item.id}
                        // onPress={() => router.push(`/exercises/${item.id}`)}
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
                <Button onPress={() => handleOpenModal(split.id)}>
                  Add exercise
                </Button>
              </VStack>
            );
          })}
        </VStack>

        <HStack px={5} justifyContent={"space-between"}>
          <Button
            display={props.currentStep === 1 ? "none" : "flex"}
            onPress={() => props.updateCurrentStep(-1)}
          >
            Back
          </Button>
          <Button onPress={saveSplitInfo}>Finish</Button>
        </HStack>
      </Box>
      <SelectExercises
        setFormData={props.setFormData}
        formData={props.formData}
        splitId={splitId}
        onClose={onClose}
        isOpen={isOpen}
      />
    </View>
  );
}
