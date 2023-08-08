import { Box, Text, Slider as SliderNativeBase } from "native-base";
import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

interface Props {
  defaultValue: number;
  step?: number;
  maxValue: number;
  minValue: number;
  unit?: "seconds";
  onChangeValue: (value: number) => void;
}

export default function Slider(props: Props) {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    props.onChangeValue(props.defaultValue);
    setCurrentValue(props.defaultValue);
  }, []);

  const handleValueChange = (value: number) => {
    setCurrentValue(value);
    props.onChangeValue && props.onChangeValue(value);
  };

  return (
    <Box alignItems="center" w="100%" px={5}>
      <Text w={"full"} textAlign="right">{`${currentValue}${
        props.unit ? "s" : ""
      }`}</Text>
      <SliderNativeBase
        step={props.step}
        maxValue={props.maxValue}
        minValue={props.minValue}
        defaultValue={props.defaultValue}
        colorScheme={"blue"}
        onChange={(v) => {
          Keyboard.dismiss();
          const newValue = Math.floor(v);
          handleValueChange(newValue);
        }}
      >
        <SliderNativeBase.Track>
          <SliderNativeBase.FilledTrack />
        </SliderNativeBase.Track>
        <SliderNativeBase.Thumb />
      </SliderNativeBase>
    </Box>
  );
}
