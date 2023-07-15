import {
  Box,
  Divider,
  FlatList,
  HStack,
  Pressable,
  VStack,
  View,
  useDisclose,
} from "native-base";
import { SPLIT_ORDER } from "../../models/workout";
import { SplitData } from "../../app/(tabs)/playlists/settingWorkout";
import { useState } from "react";
import SelectExercises from "../SelectExercises";
import { useAuth } from "../../context/auth";
import db from "@react-native-firebase/database";
import { useRouter } from "expo-router";
import { useTheme } from "../../context/theme";
import { Text } from "../themed/Text";
import { Button } from "../themed/Button";
import { SafeAreaView } from "react-native-safe-area-context";

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
  const { theme } = useTheme();

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
    <SafeAreaView>
      <Box h={"100%"} mt={2}>
        <VStack space={10}>
          {props.formData.map((split) => {
            return (
              <VStack key={split.id} space={3}>
                <Box bgColor={theme.background[500]} p={3}>
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
                <Button
                  mx={5}
                  variant="solid"
                  title="Add exercise"
                  onPress={() => handleOpenModal(split.id)}
                />
              </VStack>
            );
          })}
        </VStack>

        <HStack
          position="relative"
          bottom={0}
          px={5}
          w="full"
          justifyContent={"space-between"}
        >
          <Button
            px={10}
            title="Back"
            variant="outline"
            display={props.currentStep === 1 ? "none" : "flex"}
            onPress={() => props.updateCurrentStep(-1)}
          />
          <Button
            px={10}
            title="Finish"
            variant="solid"
            onPress={saveSplitInfo}
          />
        </HStack>
      </Box>
      <SelectExercises
        setFormData={props.setFormData}
        formData={props.formData}
        splitId={splitId}
        onClose={onClose}
        isOpen={isOpen}
      />
    </SafeAreaView>
  );
}
