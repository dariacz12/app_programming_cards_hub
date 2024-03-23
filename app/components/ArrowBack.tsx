import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type Props = {};

const ArrowBack = ({ onPress }: { onPress: () => unknown }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="items-center w-20 p-3 pl-5 rounded-2xl border bg-semi-transparent border-borderColorSemiTransparent"
    >
      <MaterialIcons name="arrow-back-ios" size={20} color="white" />
    </TouchableOpacity>
  );
};

export default ArrowBack;
