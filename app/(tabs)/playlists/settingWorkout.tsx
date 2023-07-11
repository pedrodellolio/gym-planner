import { Stack, useLocalSearchParams } from "expo-router";
import { View, Text, HStack, Button, Circle, VStack } from "native-base";
import { useState } from "react";
import WorkoutFormStep from "../../../components/configWorkoutSteps/WorkoutFormStep";
import WorkoutSplitStep from "../../../components/configWorkoutSteps/WorkoutSplitStep";
import { Exercise } from "../../../models/exercise";
import { useTheme } from "../../../context/theme";

const STEPS_NUMBER = 2;

export interface SplitData {
  id: number;
  exercises: Exercise[];
}

export default function Index() {
  const params = useLocalSearchParams();
  const { theme } = useTheme();

  const [formData, setFormData] = useState<SplitData[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSplitTypeId, setSelectedSplitTypeId] = useState(0);

  const updateCurrentStep = (value: number) => {
    if (currentStep + value >= 1 && currentStep + value <= STEPS_NUMBER) {
      setCurrentStep((prev) => prev + value);
    }
  };
  return (
    <>
      {/* <Stack.Screen options={{ headerTitle: "Setting Workout" }} /> */}

      <View h={"full"}>
        <HStack mt={3} space={3} p={3} alignSelf={"center"}>
          <Circle
            size="12px"
            bg={currentStep === 1 ? theme.background[500] : theme.text}
          ></Circle>
          <Circle
            size="12px"
            bg={currentStep === 2 ? theme.background[500] : theme.text}
          ></Circle>
        </HStack>

        <VStack space={5}>
          {currentStep === 1 ? (
            <VStack px={5}>
              <WorkoutFormStep
                formData={formData}
                setFormData={setFormData}
                selectedSplitTypeId={selectedSplitTypeId}
                setSelectedSplitTypeId={setSelectedSplitTypeId}
                currentStep={currentStep}
                updateCurrentStep={updateCurrentStep}
                playlistId={String(params.playlist)}
              />
            </VStack>
          ) : (
            currentStep === 2 && (
              <>
                <WorkoutSplitStep
                  formData={formData}
                  setFormData={setFormData}
                  selectedSplitTypeId={selectedSplitTypeId}
                  playlistId={String(params.playlistId)}
                  currentStep={currentStep}
                  updateCurrentStep={updateCurrentStep}
                />
              </>
            )
          )}

          {/* <HStack px={5} justifyContent={"space-between"}>
            <Button
              display={currentStep === 1 ? "none" : "flex"}
              onPress={() => updateCurrentStep(-1)}
            >
              Back
            </Button>
            <Button onPress={() => updateCurrentStep(1)}>
              {currentStep == STEPS_NUMBER ? "Finish" : "Next"}
            </Button>
          </HStack> */}
        </VStack>
      </View>
    </>
  );
}
