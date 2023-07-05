import { Text as NativeBaseText } from "native-base";
import {Text as DefaultText} from "react-native";

type TextProps = DefaultText['props'];

export function Text(props: TextProps) {
  return <NativeBaseText {...props} style={[props.style, { fontFamily: "ManropeRegular" }]} />;
}
