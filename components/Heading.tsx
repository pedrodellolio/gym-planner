import { Heading as NativeBaseHeading } from "native-base";
import { TextProps } from "./Themed";

export function Heading(props: TextProps) {
  return <NativeBaseHeading {...props} style={[props.style, { fontFamily: "Manrope" }]} />;
}
