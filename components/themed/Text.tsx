import { ITextProps, Text as NativeBaseText } from "native-base";
import { useTheme } from "../../context/theme";

export function Text(props: ITextProps) {
  const { style, fontWeight, ...otherProps } = props;
  const { theme } = useTheme();

  const fontFamily = (weight: any) => {
    if (weight === 700 || weight === "bold") return "Figtree_700Bold";
    else if (weight === 600 || weight === "semibold")
      return "Figtree_600SemiBold";
    else if (weight === 500 || weight === "medium") return "Figtree_500Medium";
    else "Figtree_400Regular";
  };
  return (
    <NativeBaseText
      fontFamily={fontFamily(fontWeight)}
      fontSize={20}
      color={theme.text}
      {...otherProps}
    />
  );
}
