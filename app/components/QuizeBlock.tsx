import React from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import Avatar from "./Avatar";
import H4Text from "./H4Text";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import H3Text from "./H3Text";
import LanguageLogo from "./LanguageLogo";
interface Quize {
  logo: string;
  level: number[];
  name: string;
}

interface QuizeProps {
  quize: Quize;
}
const QuizeBlock = ({ quize: { logo, level, name } }: QuizeProps) => {
  const navigation = useNavigation<any>();
  return (
    <View className="flex-row  mx-4 p-3 px-6 bg-primary rounded-full">
      {/* <TouchableOpacity
        className="flex-row"
      > */}
        <View className="flex-row flex-1">
          <View>
            <LanguageLogo isQuize={true} logo={logo} />
          </View>
          <View className="justify-center items-start ml-3">
            <H3Text text={`${name}`} />
            <Text className="text-sm  text-secondary">poziom trudności:</Text>
          </View>
        </View>
        <View className="justify-center ">
          <View className="relative flex-row">
            {level.map((index) => {
              return (
                <FontAwesome
                  key={index}
                  name="star"
                  size={20}
                  style={{ color: "rgba(254, 173, 29, 100)", paddingRight: 4 }}
                />
              );
            })}
          </View>
        </View>
      {/* </TouchableOpacity> */}
    </View>
  );
};

export default QuizeBlock;
