import { Center, FormControl, VStack } from "native-base";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import db from "@react-native-firebase/database";
import { useAuth } from "../../../context/auth";
import { formatDataSnapshot } from "../../../utils/utils";
import Dictionary from "../../../models/dictionary";
import Colors from "../../../constants/Colors";
import { Workout } from "../../../models/workout";
import { Input } from "../../../components/themed/Input";
import { useTheme } from "../../../context/theme";
import { Button } from "../../../components/themed/Button";

interface FormData {
  name: string;
}

export default function CreatePlaylist() {
  const router = useRouter();
  const { user } = useAuth();
  const { theme } = useTheme();

  const [formData, setFormData] = useState<FormData>({ name: "" });
  const [isLoading, setIsLoading] = useState(false);

  const createPlaylist = async () => {
    setIsLoading(true);
    try {
      if (user) {
        db().ref(`/users/${user.uid}/workouts/`).push(formData);
        router.back();
      }
    } catch (err) {
      console.log("Error while creating new workout playlist. " + err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    //generating default workout name based on the (total number of workouts in db + 1)
    db()
      .ref(`/users/${user.uid}/workouts`)
      .once("value")
      .then((snapshot) => {
        let value = 1;
        const dictionary: Dictionary<Workout> = snapshot.val();
        if (dictionary) {
          const workouts = formatDataSnapshot(dictionary) as Workout[];
          value = workouts.length + 1;
        }
        setFormData((prev) => {
          return {
            ...prev,
            name: `My Workout #${value}`,
          };
        });
      });
  }, []);

  return (
    <SafeAreaView>
      <Center h="full" px={5}>
        <FormControl isRequired>
          <FormControl.Label
            _text={{
              bold: true,
              fontSize: 22,
            }}
          >
            Give your new workout a name
          </FormControl.Label>
          <Input
            onChangeText={(value) => setFormData({ ...formData, name: value })}
            defaultValue={formData.name}
            placeholder="My new workout"
            color={theme.text}
            borderColor={theme.border[500]}
            focusOutlineColor={theme.tint[500]}
          />
          {/* <FormControl.HelperText
            _text={{
              fontSize: "xs",
            }}
          >
            Name should contain atleast 3 character.
          </FormControl.HelperText> */}
          <FormControl.ErrorMessage
            _text={{
              fontSize: "xs",
            }}
          >
            Error Name
          </FormControl.ErrorMessage>
        </FormControl>

        <VStack position={"absolute"} bottom={0} m={5} w={"full"} space={3}>
          <Button
            mt={2}
            p={3}
            variant={"solid"}
            title="Create new workout"
            disabled={isLoading}
            onPress={createPlaylist}
          />

          <Button
            p={3}
            variant={"outline"}
            title="Cancel"
            disabled={isLoading}
            onPress={router.back}
          />
        </VStack>
      </Center>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
