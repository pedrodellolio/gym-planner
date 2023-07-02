import { View, VStack, Box, Pressable, Flex, Text, Heading } from "native-base";
import { StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/build/FontAwesome5";
import CurrentWorkoutBanner from "../../../components/CurrentWorkoutBanner";

export default function Home() {
  return (
    <View px={5} marginTop={10} w={"100%"}>

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
