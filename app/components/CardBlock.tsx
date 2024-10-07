import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import H3Text from "./H3Text";
import LanguageLogo from "./LanguageLogo";
interface Block {
  logo: string;
  access: boolean;
  name: string;
}

interface BlockProps {
  block: Block;
}
const CardBlock = ({ block: { logo, access, name } }: BlockProps) => {
  const navigation = useNavigation<any>();
  return (
    // <TouchableOpacity onPress={() => navigation.navigate("")}>
      <View
        className={`flex-col m-4 w-40 h-38  px-5 py-7 ${access ? "bg-primary" : "bg-block border border-borderColorSemiTransparent"}  rounded-2xl`}
      >
        <View className="flex justify-center items-center">
          <LanguageLogo isQuize={false} logo={logo} />
          <H3Text text={`${name}`} />
          {access ? (
            <Text className="text-white text-sm">pełny dostęp</Text>
          ) : (
            <Text className="text-sm  text-secondary">odblokuj dostęp</Text>
          )}
        </View>
      </View>
    // </TouchableOpacity>
  );
};

export default CardBlock;
