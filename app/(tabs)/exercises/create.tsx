import { FormControl, HStack, VStack } from "native-base";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import db from "@react-native-firebase/database";
import { useAuth } from "../../../context/auth";
import Slider from "../../../components/Slider";
import { Input } from "../../../components/themed/Input";
import { Button } from "../../../components/themed/Button";
import { useTheme } from "../../../context/theme";

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
  const { theme } = useTheme();

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
              color: theme.text,
            }}
          >
            Exercise name
          </FormControl.Label>
          <Input
            placeholder="My new exercise"
            onChangeText={(value) => setFormData({ ...formData, name: value })}
            defaultValue={formData.name}
            fontSize={14}
            borderColor={theme.border[500]}
            mt={2}
            focusOutlineColor={theme.tint[500]}
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
              color: theme.text,
            }}
          >
            Reps
          </FormControl.Label>
          <Slider
            defaultValue={10}
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
              color: theme.text,
            }}
          >
            Sets
          </FormControl.Label>
          <Slider
            defaultValue={3}
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
              color: theme.text,
            }}
          >
            Interval
          </FormControl.Label>
          <Slider
            defaultValue={30}
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
                color: theme.text,
              }}
            >
              Weight
            </FormControl.Label>
            <Input
              keyboardType="numeric"
              placeholder="20kg"
              borderColor={theme.border[500]}
              focusOutlineColor={theme.tint[500]}
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
                color: theme.text,
              }}
            >
              Equipment number
            </FormControl.Label>
            <Input
              keyboardType="numeric"
              placeholder="00"
              borderColor={theme.border[500]}
              focusOutlineColor={theme.tint[500]}
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
            title="Create exercise"
            variant={"solid"}
            w={"100%"}
            py={4}
            rounded={"lg"}
            onPress={createExercise}
            isLoading={isLoading}
          />
          <Button
            title="Cancel"
            variant={"outline"}
            w={"100%"}
            py={4}
            rounded={"lg"}
            onPress={router.back}
          />
        </VStack>
      </VStack>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
