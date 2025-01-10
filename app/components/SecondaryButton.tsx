import React from "react";
import { Text, TouchableOpacity } from "react-native";

const SecondaryButton = ({
  text,
  onPress,
}: {
  text: String;
  onPress: () => unknown;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="items-center  w-40 p-3 rounded-2xl border bg-semi-transparent border-borderColorSemiTransparent"
    >
      <Text className="text-base  text-primary">{text}</Text>
    </TouchableOpacity>
  );
};

export default SecondaryButton;
