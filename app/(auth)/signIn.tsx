import { useAuth } from "../../context/auth";
import { useState } from "react";
import { VStack, FormControl, Input, Center } from "native-base";
import { Link, Stack } from "expo-router";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import { SvgXml } from "react-native-svg";
import { IndoorBikeUndrawXml } from "../../components/svg/Xml";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { Button } from "../../components/themed/Button";
import { useTheme } from "../../context/theme";
import { Text } from "../../components/themed/Text";
import { Heading } from "../../components/themed/Heading";
import { REACT_APP_GOOGLE } from "@env";

export default function SignIn() {
  const { signIn } = useAuth();
  const { theme } = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  GoogleSignin.configure({
    webClientId: REACT_APP_GOOGLE,
  });

  const handleSignIn = () => {
    setIsLoading(true);
    signIn(email, password);
    setIsLoading(false);
  };

  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerShown: false,
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
          <SvgXml xml={IndoorBikeUndrawXml} width="100%" height="100%" />
        </Center>

        <VStack space={6} px={3}>
          <Heading>Login</Heading>
          <FormControl>
            <Input
              focusOutlineColor={theme.tint[500]}
              InputLeftElement={
                <MaterialIcons
                  name="alternate-email"
                  size={20}
                  color={theme.textMuted}
                />
              }
              variant={"underlined"}
              type="text"
              p={3}
              fontSize={16}
              borderColor={theme.textMuted}
              placeholder="Email"
              onChangeText={setEmail}
            />
          </FormControl>
          <FormControl>
            <Input
              focusOutlineColor={theme.tint[500]}
              borderColor={theme.textMuted}
              InputLeftElement={
                <MaterialIcons
                  name="lock-outline"
                  size={20}
                  color={theme.textMuted}
                />
              }
              variant={"underlined"}
              type="password"
              p={3}
              fontSize={16}
              placeholder="Password"
              onChangeText={setPassword}
            />
          </FormControl>
          {/* <Button
            mt={2}
            colorScheme="indigo"
            borderColor={"indigo"}
            rounded={"lg"}
            p={3}
            disabled={isLoading}
            onPress={handleSignIn}
          >
            Login
          </Button> */}
          <Button
            mt={2}
            p={3}
            variant={"solid"}
            title="Login"
            disabled={isLoading}
            onPress={handleSignIn}
          />

          <Text style={{ color: theme.textMuted, textAlign: "center" }}>
            OR
          </Text>

          <Button
            p={3}
            variant={"outline"}
            leftIcon={
              <AntDesign color={theme.tint[500]} name="google" size={20} />
            }
            title="Login with Google"
            disabled={isLoading}
            onPress={() =>
              onGoogleButtonPress().then(() => console.log("google"))
            }
          />
          {/* <Button
            variant={"subtle"}
            colorScheme="indigo"
            rounded={"lg"}
            p={3}
            disabled={isLoading}
            leftIcon={<AntDesign name="google" size={20} />}
            onPress={() =>
              onGoogleButtonPress().then(() => console.log("google"))
            }
          >
            Login with Google
          </Button> */}
          <Text style={{ color: theme.textMuted, textAlign: "center" }}>
            Don't have an account?{" "}
            <Link
              style={{ color: theme.tint[500], fontWeight: "bold" }}
              href="/signUp"
            >
              Register
            </Link>
          </Text>
        </VStack>

        {/* <Box safeArea p="2" py="8" w="90%" maxW="290">       
          <HStack mt="6" justifyContent="center">
            <Text>I'm a new user. </Text>
            <Link href="/signUp">Sign Up</Link>
          </HStack>
        </VStack>
      </Box> */}
      </VStack>
    </SafeAreaView>
  );
}
