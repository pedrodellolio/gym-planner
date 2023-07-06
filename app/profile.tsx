import { Button, Heading, Text, VStack } from "native-base";
import UserIcon from "../components/UserIcon";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../context/auth";
import { MaterialIcons } from "@expo/vector-icons";

export default function UserProfile() {
  const { user, signOut } = useAuth();
  return (
    <>
      <SafeAreaView>
        {user && (
          <VStack
            justifyContent={"center"}
            alignItems={"center"}
            space={3}
            mt={10}
          >
            <UserIcon rounded="full" size="xl" />
            <Heading>{user.displayName}</Heading>
            <Text
              borderWidth={1}
              borderColor={"muted.300"}
              px={5}
              py={2}
              rounded="full"
            >
              {user.email}
            </Text>
            <Button
              onPress={signOut}
              leftIcon={
                <MaterialIcons name="subdirectory-arrow-right" color="white" />
              }
            >
              Logout
            </Button>
          </VStack>
        )}
      </SafeAreaView>
    </>
  );
}
