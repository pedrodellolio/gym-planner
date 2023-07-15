import { ITextProps, Text as NativeBaseText } from "native-base";
import { useTheme } from "../../context/theme";

export function Text(props: ITextProps) {
  const { style, ...otherProps } = props;
  const { theme } = useTheme();

  return (
    <NativeBaseText
      fontFamily={"Figtree_400Regular"}
      fontSize={20}
      color={theme.text}
      {...otherProps}
    />
  );
}
