import { TextProps } from "react-native";
import { IHeadingProps, Heading as NativeBaseHeading } from "native-base";
import { useTheme } from "../../context/theme";

export function Heading(props: IHeadingProps) {
  const { style, ...otherProps } = props;
  const { theme } = useTheme();

  return (
    <NativeBaseHeading
      fontSize={26}
      style={{
        color: theme.text,
        fontFamily: "Figtree_300Light",
      }}
      {...otherProps}
    />
  );
}
