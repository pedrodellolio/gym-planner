import { HStack, IconButton } from "native-base";
import { Image, StyleSheet } from "react-native";
import { Heading } from "./Heading";
import { SafeAreaView } from "react-native-safe-area-context";
import { ReactNode } from "react";

interface Props {
  title?: string;
  left: ReactNode;
}
export default function AppBar(props: Props) {
  return (
    <SafeAreaView>
      <HStack
        alignItems={"center"}
        justifyContent={"space-between"}
        px={5}
        py={3}
      >
        <Image
          source={require("../assets/images/1680367185462.jpg")}
          style={styles.userIcon}
        />
        <Heading style={styles.title}>{props.title ?? ""}</Heading>
        {props.left}
      </HStack>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  userIcon: {
    width: 40,
    height: 40,
    borderRadius: 6,
  },
  logo: {
    width: 66,
    height: 58,
  },
  title: {
    fontFamily: "Manrope",
    fontSize: 20,
    fontWeight: "bold",
  },
});
