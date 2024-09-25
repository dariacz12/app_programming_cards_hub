import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

type Props = {};

const QuizeSecondaryButton = ({
  onPress,
}: {
  onPress: () => unknown;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="items-center w-36 h-11 rounded-2xl justify-center border bg-semi-transparent border-borderColorSemiTransparent"
    >
      <Text className="text-base  text-primary">Cofnij</Text>
    </TouchableOpacity>
  );
};

export default QuizeSecondaryButton;
