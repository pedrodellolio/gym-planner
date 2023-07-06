import { ReactNode } from "react";
import { useAuth } from "../context/auth";
import { Image, Square } from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";

interface Props {
  marginRight?: number;
  marginLeft?: number;
  size?: string;
  rounded?: string;
}

export default function UserIcon(props: Props) {
  const { user } = useAuth();

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
          bgColor={"muted.200"}
        >
          <FontAwesome5 name="user" size={20} color="#a3a3a3" />
        </Square>
      )}
    </>
  );
}
