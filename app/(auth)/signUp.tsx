import { useAuth } from "../../context/auth";
import { useState } from "react";
import {
  Box,
  Center,
  FormControl,
  HStack,
  Heading,
  Input,
  VStack,
  Button,
  Text,
} from "native-base";
import { Link, Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { EnergizerUndrawXml } from "../../components/svg/Xml";
import { SvgXml } from "react-native-svg";
import { useTheme } from "../../context/theme";

export default function SignUp() {
  const { signUp } = useAuth();
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = () => {
    setIsLoading(true);
    signUp(email, password, name);
    setIsLoading(false);
  };

  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: Colors["primary"].bg },
        }}
      ></Stack.Screen>

      <VStack
        h={"full"}
        display={"flex"}
        justifyContent={"center"}
        space={10}
        px={5}
      >
        <Center alignSelf={"center"} w={"250px"} h={"250px"}>
          <SvgXml xml={EnergizerUndrawXml} width="100%" height="100%" />
        </Center>

        <VStack space={6} px={3}>
          <Heading>Register</Heading>
          <FormControl>
            <Input
              focusOutlineColor={theme.tint[500]}
              InputLeftElement={
                <FontAwesome5 name="user" size={20} color="#a3a3a3" />
              }
              variant={"underlined"}
              type="text"
              p={3}
              fontSize={16}
              borderColor="muted.200"
              placeholder="Full name"
              onChangeText={setName}
            />
          </FormControl>
          <FormControl>
            <Input
              focusOutlineColor={theme.tint[500]}
              InputLeftElement={
                <MaterialIcons
                  name="alternate-email"
                  size={20}
                  color="#a3a3a3"
                />
              }
              variant={"underlined"}
              type="text"
              p={3}
              fontSize={16}
              borderColor="muted.200"
              placeholder="Email"
              onChangeText={setEmail}
            />
          </FormControl>
          <FormControl>
            <Input
              focusOutlineColor={theme.tint[500]}
              borderColor="muted.200"
              InputLeftElement={
                <MaterialIcons name="lock-outline" size={20} color="#a3a3a3" />
              }
              variant={"underlined"}
              type="password"
              p={3}
              fontSize={16}
              placeholder="Password"
              onChangeText={setPassword}
            />
          </FormControl>
          <Button
            mt={2}
            colorScheme="indigo"
            borderColor={"indigo"}
            rounded={"lg"}
            p={3}
            disabled={isLoading}
            onPress={handleSignUp}
          >
            Register
          </Button>
          <Text color={"#a3a3a3"} textAlign={"center"}>
            Already have an account?{" "}
            <Link
              style={{ color: "indigo", fontWeight: "bold" }}
              href="/signIn"
            >
              Login
            </Link>
          </Text>
        </VStack>
      </VStack>
    </SafeAreaView>
  );
}
