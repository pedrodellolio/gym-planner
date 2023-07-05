import { HStack, Icon, IconButton } from "native-base";
import SearchBar from "../../../components/SearchBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { router, useRouter } from "expo-router";

export default function Playlists() {
  const router = useRouter();
  return (
    <SafeAreaView>
      <HStack bgColor={"muted.200"} p={1} justifyContent={"center"}>
        <IconButton
          onPress={router.back}
          icon={<MaterialIcons name="arrow-back" size={25} />}
        />
        <SearchBar placeholderTextColor="muted.500" borderWidth={0} width={"80%"} placeholder={"Search for your workouts"} />
      </HStack>
    </SafeAreaView>
  );
}
