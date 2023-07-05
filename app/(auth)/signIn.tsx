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
import { Link } from "expo-router";

export default function SignIn() {
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = () => {
    setIsLoading(true);
    signIn(email, password);
    setIsLoading(false);
  };

  return (
    <Center w="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
        >
          Welcome
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: "warmGray.200",
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs"
        >
          Sign in to continue!
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input type="text" onChangeText={setEmail} />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input type="password" onChangeText={setPassword} />
            {/* <Link href="">Forget Password?</Link> */}
          </FormControl>
          <Button
            mt="2"
            colorScheme="indigo"
            disabled={isLoading}
            onPress={handleSignIn}
          >
            Sign in
          </Button>
          <Button
            mt="2"
            colorScheme="indigo"
            disabled={isLoading}
          >
            Sign in with Google
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text>I'm a new user. </Text>
            <Link href="/signUp">Sign Up</Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
    // <View style={styles.container}>
    //   <Text style={styles.title}>Sign In</Text>
    //   <View
    //     style={styles.separator}
    //     lightColor="#eee"
    //     darkColor="rgba(255,255,255,0.1)"
    //   />
    //   <EditScreenInfo path="app/(tabs)/index.tsx" />
    //   <Button title="Sign In" onPress={() => signIn(email, password)}></Button>
    // </View>
  );
}
