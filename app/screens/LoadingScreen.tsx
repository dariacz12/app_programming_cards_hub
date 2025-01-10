import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LoadingScreen = () => {
  const logo = require("../../assets/logo.png");

  return (
    <SafeAreaView className="flex-1 justi bg-primary ">
      <View className="flex-1 flex justify-center items-center ">
      </View>
    </SafeAreaView>
  );
};

export default LoadingScreen;
