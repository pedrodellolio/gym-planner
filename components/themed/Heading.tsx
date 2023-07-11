import { TextProps } from "react-native";
import { Heading as NativeBaseHeading } from "native-base";
import { useTheme } from "../../context/theme";

export function Heading(props: TextProps) {
  const { style, ...otherProps } = props;
  const { theme } = useTheme();

  return (
    <NativeBaseHeading style={[{ color: theme.text }, style]} {...otherProps} />
  );
}
