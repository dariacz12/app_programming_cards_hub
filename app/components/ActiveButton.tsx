import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ActiveButton = ({
  text,
  onPress,
}: {
  text: String;
  onPress: () => unknown;
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        className="items-center w-40 p-3 rounded-2xl border border-borderColorActive"
        colors={["rgba(13, 166, 194, 1)", "rgba(14, 57, 198, 1)"]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
      >
        <Text className="text-base text-primary">{text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default ActiveButton;
