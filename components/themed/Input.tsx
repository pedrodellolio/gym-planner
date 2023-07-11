import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../../context/theme";
import { IInputProps, Input as NativeBaseInput} from "native-base";

export function Input(props: IInputProps) {
  const { theme } = useTheme();
  
  return (
    <NativeBaseInput
      variant={"underlined"}
      type="text"
      p={3}
      fontSize={16}
      borderColor={theme.textMuted}
      {...props}
    />
  );
}
