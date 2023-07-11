import { HStack, IconButton } from "native-base";
import SearchBar from "../../../components/SearchBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTheme } from "../../../context/theme";

export default function Playlists() {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <SafeAreaView>
      <HStack bgColor={theme.background[600]} p={1} justifyContent={"center"}>
        <IconButton
          onPress={router.back}
          icon={
            <MaterialIcons name="arrow-back" color={theme.text} size={25} />
          }
        />
        <SearchBar
          placeholderTextColor={theme.textMuted}
          borderWidth={0}
          width={"80%"}
          placeholder={"Search for your workouts"}
        />
      </HStack>
    </SafeAreaView>
  );
}
