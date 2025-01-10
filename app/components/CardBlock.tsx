import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import H3Text from "./H3Text";
import LanguageLogo from "./LanguageLogo";
import { Card } from "../types/Card";

const CardBlock = (block: Card) => {
  const navigation = useNavigation<any>();
  return (
    <View
      className={`flex-col m-4 w-40 h-38  px-5 py-7 ${block.access ? "bg-primary" : "bg-block border border-borderColorSemiTransparent"}  rounded-2xl`}
    >
      <View className="flex justify-center items-center">
        <LanguageLogo isQuize={false} logo={block.logo} />
        <H3Text text={`${block.name}`} />
        {block.access ? (
          <Text className="text-white text-sm">pełny dostęp</Text>
        ) : (
          <Text className="text-sm  text-secondary">odblokuj dostęp</Text>
        )}
      </View>
    </View>
  );
};

export default CardBlock;
