import React, { ReactNode } from "react";
import { Text, TouchableOpacity } from "react-native";

const QuizeSecondaryButton = ({
  onPress,
  children,
  isResultPage = false,
}: {
  onPress: () => unknown;
  children: ReactNode;
  isResultPage?: boolean;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`items-center ${isResultPage ? "w-40 " : "w-36"} h-11 rounded-2xl justify-center border bg-semi-transparent border-borderColorSemiTransparent`}
    >
      <Text className="text-base  text-primary">{children}</Text>
    </TouchableOpacity>
  );
};

export default QuizeSecondaryButton;
