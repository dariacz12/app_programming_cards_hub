import React from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import Avatar from "./Avatar";
import H4Text from "./H4Text";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import H3Text from "./H3Text";
import LanguageLogo from "./LanguageLogo";

const QuizeBlock = () => {
  const navigation = useNavigation<any>();
  return (
    <View className="flex-row  mx-4 p-3 px-6 bg-primary rounded-full">
      <View className="flex-row flex-1">
        <View className="">
          <TouchableOpacity
            className=""
            onPress={() => navigation.navigate("Account")}
          >
            <LanguageLogo />
          </TouchableOpacity>
        </View>
        <View className="justify-center items-start ml-3">
          <H3Text text={"Dzień dobry!"} />
          <Text className="text-sm  text-secondary">poziom trudności:</Text>
        </View>
      </View>
      <View className="justify-center ">
        <TouchableOpacity onPress={() => navigation.navigate("Account")}>
          <View className="relative flex-row">
            <FontAwesome
              name="star"
              size={24}
              style={{ color: "rgba(254, 173, 29, 100)" }}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default QuizeBlock;
