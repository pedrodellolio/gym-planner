import {
  View,
  VStack,
  Box,
  Pressable,
  Flex,
  IconButton,
  ScrollView,
  HStack,
  Divider,
} from "native-base";
import { StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/build/FontAwesome5";
import CurrentWorkoutBanner from "../../components/CurrentWorkoutBanner";
import Colors from "../../constants/Colors";
import { Stack, useRouter } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../../context/auth";
import UserIcon from "../../components/UserIcon";
import { useColorScheme } from "react-native";
import { Text } from "../../components/themed/Text";
import { Heading } from "../../components/themed/Heading";
import { useTheme } from "../../context/theme";

export default function Home() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const { theme } = useTheme();

  const options = {
    headerShadowVisible: false,
    headerTitleStyle: {
      fontFamily: "Manrope_700Bold",
      fontSize: 18,
    },
    headerStyle: {
      backgroundColor: theme.background[300],
    },
  };

  return (
    <View marginTop={10} w={"100%"}>
      <Stack.Screen
        options={{
          ...options,
          contentStyle: { backgroundColor: theme.tint },
          headerLeft: () => (
            <Pressable onPress={() => router.push("/profile")}>
              <UserIcon
                size={"xs"}
                rounded={"lg"}
                marginLeft={5}
                marginRight={1}
              />
            </Pressable>
          ),
          headerRight: () => (
            <IconButton
              mr={3}
              size={"lg"}
              onPress={signOut}
              _icon={{
                as: MaterialIcons,
                name: "subdirectory-arrow-right",
                color: theme.text,
              }}
            />
          ),
        }}
      />
      <VStack mt={5} mb={10} space={2} px={5}>
        {/* <Text style={{ color: theme.textMuted, fontSize: 18 }}>
          Welcome back,
        </Text>
        <Heading style={[styles.text, { fontSize: 30 }]}>
          {"Pedro Dell'Olio"}
        </Heading> */}
        <Text style={{ fontSize: 28, fontWeight: "600" }}>Workout</Text>
        <Text style={{ fontSize: 28, fontWeight: "600" }}>In Progress</Text>

        <VStack marginTop={5}>
          <CurrentWorkoutBanner />
        </VStack>
      </VStack>

      <Box bgColor={theme.background[500]} h={"100%"} roundedTop="3xl">
        <Box mt={8} mx={5}>
          <Text style={{ fontSize: 18, color: theme.textMuted }}>
            Quick Access
          </Text>
        </Box>
        <Box>
          <ScrollView
            mt={5}
            ml={5}
            horizontal={true}
            p={0}
            showsHorizontalScrollIndicator={false}
          >
            <HStack space={3}>
              <Pressable
                display={"flex"}
                justifyContent={"flex-end"}
                bgColor={theme.background[400]}
                w={"140px"}
                rounded={"xl"}
                p={6}
              >
                <VStack space={3}>
                  <FontAwesome5
                    name="running"
                    size={30}
                    color={theme.tint[500]}
                  />
                  <Text
                    style={{
                      fontSize: 18,
                      color: theme.text,
                      fontWeight: "bold",
                    }}
                  >
                    Change Workout
                  </Text>
                </VStack>
              </Pressable>
              <Pressable
                display={"flex"}
                justifyContent={"flex-end"}
                bgColor={theme.background[400]}
                w={"140px"}
                rounded={"xl"}
                p={6}
              >
                <VStack space={3}>
                  <FontAwesome5
                    name="dumbbell"
                    size={30}
                    color={theme.tint[500]}
                  />
                  <Text
                    style={{
                      fontSize: 18,
                      color: theme.text,
                      fontWeight: "bold",
                    }}
                  >
                    Add Exercise
                  </Text>
                </VStack>
              </Pressable>
              <Pressable
                display={"flex"}
                justifyContent={"flex-end"}
                bgColor={theme.background[400]}
                w={"140px"}
                rounded={"xl"}
                p={6}
              >
                <VStack space={3}>
                  <FontAwesome5
                    name="dumbbell"
                    size={30}
                    color={theme.tint[500]}
                  />
                  <Text
                    style={{
                      fontSize: 18,
                      color: theme.text,
                      fontWeight: "bold",
                    }}
                  >
                    Add Exercise
                  </Text>
                </VStack>
              </Pressable>
            </HStack>
          </ScrollView>
        </Box>
      </Box>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    fontWeight: "bold",
  },
});
