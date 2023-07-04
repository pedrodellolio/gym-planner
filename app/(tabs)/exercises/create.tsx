import { Button, FormControl, HStack, Input, VStack } from "native-base";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import db from "@react-native-firebase/database";
import { useAuth } from "../../../context/auth";
import Slider from "../../../components/Slider";

interface FormData {
  name: string;
  restIntervalInSeconds: number;
  equipmentNumber?: number;
  reps: number;
  sets: number;
  weight?: number;
}

export default function CreateExercise() {
  const router = useRouter();
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    restIntervalInSeconds: 30,
    equipmentNumber: 0,
    reps: 0,
    sets: 0,
    weight: 0,
  });

  const createExercise = async () => {
    setIsLoading(true);
    try {
      if (user) {
        db().ref(`/users/${user.uid}/exercises/`).push(formData);
        router.back();
      }
    } catch (err) {
      console.log("Error while creating new exercise. " + err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView>
      <VStack px={5} space={3}>
        <FormControl isRequired>
          <FormControl.Label
            _text={{
              color: "#212121",
            }}
          >
            Exercise name
          </FormControl.Label>
          <Input
            placeholder="My new exercise"
            onChangeText={(value) => setFormData({ ...formData, name: value })}
            defaultValue={formData.name}
            fontSize={14}
            mt={2}
          />
          <FormControl.ErrorMessage
            _text={{
              fontSize: "xs",
            }}
          >
            Error Name
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl isRequired>
          <FormControl.Label
            _text={{
              color: "#212121",
            }}
          >
            Reps
          </FormControl.Label>
          <Slider
            defaultValue={10}
            colorScheme="purple"
            step={1}
            minValue={0}
            maxValue={20}
            onChangeValue={(value) => setFormData({ ...formData, reps: value })}
          />
          <FormControl.ErrorMessage
            _text={{
              fontSize: "xs",
            }}
          >
            Error Name
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl isRequired>
          <FormControl.Label
            _text={{
              color: "#212121",
            }}
          >
            Sets
          </FormControl.Label>
          <Slider
            defaultValue={3}
            colorScheme="purple"
            step={1}
            minValue={0}
            maxValue={5}
            onChangeValue={(value) => {
              setFormData({ ...formData, sets: value });
            }}
          />
          <FormControl.ErrorMessage
            _text={{
              fontSize: "xs",
            }}
          >
            Error Name
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl isRequired>
          <FormControl.Label
            _text={{
              color: "#212121",
            }}
          >
            Interval
          </FormControl.Label>
          <Slider
            defaultValue={30}
            colorScheme="purple"
            step={15}
            minValue={0}
            maxValue={60}
            unit="seconds"
            onChangeValue={(value) =>
              setFormData({ ...formData, restIntervalInSeconds: value })
            }
          />
          <FormControl.ErrorMessage
            _text={{
              fontSize: "xs",
            }}
          >
            Error Name
          </FormControl.ErrorMessage>
        </FormControl>

        <HStack justifyContent={"space-between"} w={"100%"}>
          <FormControl w={"45%"}>
            <FormControl.Label
              _text={{
                color: "#212121",
              }}
            >
              Weight
            </FormControl.Label>
            <Input
              keyboardType="numeric"
              placeholder="20kg"
              onChangeText={(value) =>
                setFormData({ ...formData, weight: Number(value) })
              }
              fontSize={14}
              mt={2}
            />
            <FormControl.ErrorMessage
              _text={{
                fontSize: "xs",
              }}
            >
              Error Name
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl w={"45%"}>
            <FormControl.Label
              _text={{
                color: "#212121",
              }}
            >
              Equipment number
            </FormControl.Label>
            <Input
              keyboardType="numeric"
              placeholder="00"
              onChangeText={(value) =>
                setFormData({ ...formData, equipmentNumber: Number(value) })
              }
              fontSize={14}
              mt={2}
            />
            <FormControl.ErrorMessage
              _text={{
                fontSize: "xs",
              }}
            >
              Error Name
            </FormControl.ErrorMessage>
          </FormControl>
        </HStack>
        <VStack justifyContent={"center"} mt={5} w={"full"} space={3}>
          <Button
            variant={"primary"}
            backgroundColor={"gray.300"}
            w={"100%"}
            py={4}
            rounded={"lg"}
            onPress={createExercise}
            isLoading={isLoading}
          >
            Create exercise
          </Button>
          <Button
            variant={"outline"}
            w={"100%"}
            py={4}
            rounded={"lg"}
            onPress={router.back}
          >
            Cancel
          </Button>
        </VStack>
      </VStack>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
