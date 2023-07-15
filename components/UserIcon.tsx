import { ReactNode } from "react";
import { useAuth } from "../context/auth";
import { Image, Square } from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";
import { useTheme } from "../context/theme";

interface Props {
  marginRight?: number;
  marginLeft?: number;
  size?: string;
  rounded?: string;
}

export default function UserIcon(props: Props) {
  const { user } = useAuth();
  const { theme, colorScheme } = useTheme();
  return (
    <>
      {user && user.photoURL ? (
        <Image
          source={{
            uri: user.photoURL?.replaceAll("s96-c", "s400-c"),
          }}
          alt="User Icon"
          size={props.size ?? 20}
          rounded={props.rounded ?? "none"}
          ml={props.marginLeft ?? 0}
          mr={props.marginRight ?? 0}
        />
      ) : (
        <Square
          size={props.size ?? 20}
          ml={props.marginLeft ?? 0}
          mr={props.marginRight ?? 0}
          rounded={props.rounded ?? "none"}
          bgColor={theme.tint[500]}
        >
          <FontAwesome5
            name="user"
            size={20}
            color={colorScheme === "dark" ? theme.white : theme.black}
          />
        </Square>
      )}
    </>
  );
}
