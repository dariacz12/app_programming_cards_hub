import {
  ScrollView,
  ScrollViewBase,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import H1Text from "../components/H1Text";
import H4Text from "../components/H4Text";
import Avatar from "../components/Avatar";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Rings } from "../components/SkiaProgressComponents/Rings";
import H2Text from "../components/H2Text";
import H3Text from "../components/H3Text";
import QuizeBlock from "../components/QuizeBlock";

const Home = () => {
  const navigation = useNavigation<any>();
  const [notifications, setNotifications] = useState<boolean>(false);

  return (
    <ScrollView className="bg-primary">
      <View className="flex-1 h-screen w-screen pt-[93]  bg-primary">
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
        </View>
        <View className="mt-32 bg-semi-transparent   flex-1 items-center justify-center  relative border border-t-borderColorSemiTransparent">
          <View className="absolute bottom-9">
            <View className="relative flex-1 justify-center items-center h-screen w-screen">
              <View
                className="h-32 w-64 bg-primary border absolute border-b-borderColorSemiTransparent border-l-borderColorSemiTransparent  border-r-borderColorSemiTransparent  border-t-primaryBorder
                              rounded-bl-full rounded-br-full  "
              ></View>
            </View>
          </View>
          <View className="flex-1 top-28">
            <View className="right-24 my-7">
              <H3Text text={"Bezpłatne quizy:"} />
            </View>

            <View className="flex-1 flex-row items-center justify-start">
              <QuizeBlock />
            </View>
          </View>
        </View>

        {/* <View className="flex-1">
           <Rings />
        </View> */}
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({});
