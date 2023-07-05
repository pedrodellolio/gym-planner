import Colors from "../../constants/Colors";
import { View as NativeBaseView } from "native-base";
import { View as DefaultView } from "react-native";

type ViewProps = DefaultView["props"];

export function View(props: ViewProps) {
  const { style, ...otherProps } = props;

  return (
    <NativeBaseView
      style={[{ backgroundColor: Colors["primary"].bg }, style]}
      {...otherProps}
    />
  );
}
