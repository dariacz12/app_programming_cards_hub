import React from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import Avatar from "./Avatar";
import H4Text from "./H4Text";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import H3Text from "./H3Text";
import LanguageLogo from "./LanguageLogo";
import { Quiz } from "../types/Quize";


const QuizeBlock = (quiz: Quiz) => {
  return (
    <View className="flex-row  mx-4 p-3 px-6 bg-primary rounded-full">
      <View className="flex-row flex-1">
        <View>
          <LanguageLogo isQuize={true} logo={quiz.logo} />
        </View>
        <View className="justify-center items-start ml-3">
          <H3Text text={`${quiz.name}`} />
          <Text className="text-sm  text-secondary">poziom trudności:</Text>
        </View>
      </View>
      <View className="justify-center ">
        <View className="relative flex-row">
          {Array.from({ length: quiz.level }).map((_, index) => {
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
    </View>
  );
};

export default QuizeBlock;
