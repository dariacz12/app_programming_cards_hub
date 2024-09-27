import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const QuizeActiveButton = ({
  onPress,
  children,
  isResultPage=false,
}: {
  onPress: () => unknown;
  children:string;
  isResultPage?: boolean;
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        className={`items-center  ${isResultPage?"w-40 ": "w-36"} h-11 justify-center  rounded-2xl border border-borderColorActive`}
        colors={["rgba(13, 166, 194, 1)", "rgba(14, 57, 198, 1)"]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
      >
        <Text className="text-base text-primary">{children}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default QuizeActiveButton;
