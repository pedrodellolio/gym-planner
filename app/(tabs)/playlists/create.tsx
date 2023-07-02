import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  Input,
  VStack,
  View,
} from "native-base";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import db, { FirebaseDatabaseTypes } from "@react-native-firebase/database";
import { useAuth } from "../../../context/auth";
import { formatDataSnapshot } from "../../../utils/utils";
import Workout from "../../../models/workout";
import Dictionary from "../../../models/dictionary";
import Colors from "../../../constants/Colors";

interface FormData {
  name: string;
}

export default function CreatePlaylist() {
  const router = useRouter();
  const { user } = useAuth();

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
            Dê um nome para sua playlist
          </FormControl.Label>
          <Input
            placeholder="My new playlist"
            onChangeText={(value) => setFormData({ ...formData, name: value })}
            defaultValue={formData.name}
            fontSize={20}
            mt={3}
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
            variant={"primary"}
            backgroundColor={Colors["primary"].tint}
            w={"100%"}
            py={4}
            rounded={"lg"}
            onPress={createPlaylist}
            isLoading={isLoading}
          >
            Criar nova playlist
          </Button>
          <Button
            variant={"outline"}
            w={"100%"}
            py={4}
            rounded={"lg"}
            onPress={router.back}
          >
            Cancelar
          </Button>
        </VStack>
      </Center>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
