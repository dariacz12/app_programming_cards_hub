import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import H1Text from "../components/H1Text";
import H4Text from "../components/H4Text";
import Avatar from "../components/Avatar";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Rings } from "../components/SkiaProgressComponents/Rings";

const Home = () => {
  const navigation = useNavigation<any>();
  const [notifications, setNotifications] = useState<boolean>(false);

  return (
    <View className="h-full">
      <Rings />
    </View>
  );

  return (
    <SafeAreaView className="flex-1  bg-primary">
      <View className="flex-row my-5 mx-10">
        <View className="flex-row flex-1">
          <View className="">
            <TouchableOpacity
              className=""
              onPress={() => navigation.navigate("Account")}
            >
              <Avatar homeScreen={true} />
            </TouchableOpacity>
          </View>
          <View className="justify-center ml-3">
            <H4Text text={"Dzień dobry!"} />
            <Text className="text-sm  text-secondary">Ruby</Text>
          </View>
        </View>
        <View className="justify-center ">
          <TouchableOpacity onPress={() => navigation.navigate("Account")}>
            <View className="relative">
              <MaterialIcons
                name="notifications"
                size={24}
                color="ghostwhite"
              />
              {notifications && (
                <View className="absolute top-0.5 right-0.5  rounded-full bg-yellowColor w-2 h-2"></View>
              )}
            </View>
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center mt-10 bg-white h-64 w-64">
          <Rings />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
