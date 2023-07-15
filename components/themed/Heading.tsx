import { TextProps } from "react-native";
import { IHeadingProps, Heading as NativeBaseHeading } from "native-base";
import { useTheme } from "../../context/theme";

export function Heading(props: IHeadingProps) {
  const { style, ...otherProps } = props;
  const { theme } = useTheme();

  return (
    <NativeBaseHeading
      style={{
        color: theme.text,
        fontSize: 26,
        fontFamily: "Figtree_300Light",
      }}
      {...otherProps}
    />
  );
}
