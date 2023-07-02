import { Stack } from "expo-router";
import { View, Text, HStack, Button, Circle, VStack } from "native-base";
import { useState } from "react";
import WorkoutFormStep from "../../../../components/configWorkoutSteps/WorkoutFormStep";
import WorkoutSplitStep from "../../../../components/configWorkoutSteps/WorkoutSplitStep";

const STEPS_NUMBER = 2;

export default function Index() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSplitTypeId, setSelectedSplitTypeId] = useState(0);

  const updateCurrentStep = (value: number) => {
    if (currentStep + value >= 1 && currentStep + value <= STEPS_NUMBER) {
      setCurrentStep((prev) => prev + value);
    }
  };
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerTitle: "Activity" }} />
      </Stack>

      <View h={"full"}>
        <HStack mt={3} space={3} p={3} alignSelf={"center"}>
          <Circle
            size="12px"
            bg={currentStep === 1 ? "gray.600" : "gray.300"}
          ></Circle>
          <Circle
            size="12px"
            bg={currentStep === 2 ? "gray.600" : "gray.300"}
          ></Circle>
        </HStack>

        <VStack space={5}>
          {currentStep === 1 ? (
            <VStack px={5}>
              <WorkoutFormStep
                selectedSplitTypeId={selectedSplitTypeId}
                setSelectedSplitTypeId={setSelectedSplitTypeId}
              />
            </VStack>
          ) : (
            currentStep === 2 && (
              <>
                <WorkoutSplitStep selectedSplitTypeId={selectedSplitTypeId} />
              </>
            )
          )}

          <HStack px={5} justifyContent={"space-between"}>
            <Button
              display={currentStep === 1 ? "none" : "flex"}
              onPress={() => updateCurrentStep(-1)}
            >
              Back
            </Button>
            <Button onPress={() => updateCurrentStep(1)}>
              {currentStep == STEPS_NUMBER ? "Finish" : "Next"}
            </Button>
          </HStack>
        </VStack>
      </View>
    </>
  );
}
