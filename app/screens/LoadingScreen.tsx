import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LoadingScreen = () => {
  const logo = require("../../assets/logo.png");

  return (
    <SafeAreaView className="flex-1 justi bg-primary ">
      <View className="flex-1 flex justify-center items-center  ">
        {/* <Image source={logo} className="w-52 h-9" /> */}
      </View>
    </SafeAreaView>
  );
};

export default LoadingScreen;
