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
import { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../constants/Colors";
import { useRouter } from "expo-router";

interface FormData {
  name: string;
}

export default function CreatePlaylist() {
  const [formData, setData] = useState<FormData>({ name: "" });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  return (
    <SafeAreaView>
      <Center h="full" px={5}>
        <FormControl isRequired>
          <FormControl.Label
            _text={{
              bold: true,
            }}
          >
            Name
          </FormControl.Label>
          <Input
            placeholder="My new playlist"
            onChangeText={(value) => setData({ ...formData, name: value })}
          />
          <FormControl.HelperText
            _text={{
              fontSize: "xs",
            }}
          >
            Name should contain atleast 3 character.
          </FormControl.HelperText>
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
