import { ButtonProps } from "react-native";
import { IButtonProps, Button as NativeBaseButton } from "native-base";
import { useTheme } from "../../context/theme";

interface Props {
  title: string;
  variant: "solid" | "outline";
}
export function Button(props: IButtonProps & Props) {
  const { title, variant, ...otherProps } = props;
  const { theme } = useTheme();

  return (
    <NativeBaseButton
      rounded={"lg"}
      variant={variant}
      bgColor={variant === "solid" ? theme.tint[500] : undefined}
      colorScheme={"pink"}
      borderColor={theme.tint[500]}
      borderWidth={variant === "solid" ? 0 : 1}
      {...otherProps}
    >
      {props.title}
    </NativeBaseButton>
  );
}
