import { TextProps } from "react-native";
import { Text as NativeBaseText } from "native-base";
import { useTheme } from "../../context/theme";

export function Text(props: TextProps) {
  const { style, ...otherProps } = props;
  const { theme } = useTheme();

  return (
    <NativeBaseText
      style={[
        { color: theme.text, fontSize: 16, lineHeight: 27, fontWeight: "400" },
        style,
      ]}
      {...otherProps}
    />
  );
}
