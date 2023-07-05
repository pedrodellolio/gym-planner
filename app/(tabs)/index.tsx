import {
  View,
  VStack,
  Box,
  Pressable,
  Flex,
  Text,
  Heading,
  IconButton,
} from "native-base";
import { StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/build/FontAwesome5";
import CurrentWorkoutBanner from "../../components/CurrentWorkoutBanner";
import Colors from "../../constants/Colors";
import { Stack } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../../context/auth";

export default function Home() {
  const { signOut } = useAuth();
  return (
    <View px={5} marginTop={10} w={"100%"}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <IconButton
              size={"lg"}
              onPress={signOut}
              _icon={{
                as: MaterialIcons,
                name: "subdirectory-arrow-right",
                color: "muted.800",
              }}
            />
          ),
          contentStyle: { backgroundColor: Colors["primary"].bg },
          headerTitleStyle: {
            fontFamily: "Manrope_700Bold",
          },
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors["primary"].bg },
        }}
      />
      <VStack>
        <Text style={{ color: "#6B6B6B", fontSize: 20 }}>Welcome back,</Text>
        <Heading style={[styles.text, { fontSize: 30 }]}>
          Pedro Dell'Olio
        </Heading>

        <VStack marginTop={5}>
          <CurrentWorkoutBanner />
        </VStack>
      </VStack>

      <Flex
        mt={5}
        direction="row"
        justify="space-around"
        align="center"
        width={"100%"}
      >
        <Pressable
          bgColor={"#EFF25E"}
          rounded={"xl"}
          w={"175"}
          h={"175"}
          display="flex"
          justifyContent={"center"}
          px={8}
        >
          <FontAwesome5 name="running" size={45} color={"#323232"} />
          <Heading style={styles.text}>Change</Heading>
          <Heading style={styles.text}>Workout</Heading>
        </Pressable>
        <Box borderWidth={2} rounded={"xl"} p={1}>
          <Pressable
            bgColor={"#EFF25E"}
            rounded={"xl"}
            w={"170"}
            h={"170"}
            display="flex"
            justifyContent={"center"}
            px={8}
          >
            <FontAwesome name="plus-square-o" size={40} color={"#323232"} />
            <Heading style={styles.text}>Add</Heading>
            <Heading style={styles.text}>Exercise</Heading>
          </Pressable>
        </Box>
      </Flex>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#323232",
    fontSize: 22,
    fontWeight: "bold",
  },
});
