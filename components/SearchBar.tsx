import { Input } from "native-base";

interface Props {
  placeholder: string;
  width?: string;
  borderWidth?: number;
  placeholderTextColor?: string;
  icon?: JSX.Element;
}

function SearchBar(props: Props) {
  return (
    <Input
      placeholder={props.placeholder}
      placeholderTextColor={props.placeholderTextColor ?? "muted.400"}
      width={props.width ?? "100%"}
      borderRadius="lg"
      py="2"
      px="1"
      fontSize="sm"
      borderWidth={props.borderWidth}
      InputLeftElement={props.icon}
      //   InputRightElement={
      //     <Icon
      //       m="2"
      //       mr="3"
      //       size="6"
      //       color="gray.400"
      //       as={<MaterialIcons name="mic" />}
      //     />
      //   }
    />
  );
}

export default SearchBar;
