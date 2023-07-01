import { Text as NativeBaseText } from "native-base";
import { TextProps } from "./Themed";

export function Text(props: TextProps) {
  return <NativeBaseText {...props} style={[props.style, { fontFamily: "Manrope" }]} />;
}
