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
import CardBlock from "../components/CardBlock";
import Tabbar from "../components/Tabbar";

const quizes = [
  {
    logo: require("../../assets/react.png"),
    level: [1, 2, 3],
    name: "React",
  },
  {
    logo: require("../../assets/css.png"),
    level: [1],
    name: "CSS",
  },
  {
    logo: require("../../assets/php.png"),
    level: [1, 2, 3],
    name: "PHP",
  },
  {
    logo: require("../../assets/html.png"),
    level: [1],
    name: "HTML",
  },
  {
    logo: require("../../assets/java.png"),
    level: [1, 2],
    name: "Java",
  },
];
const blockes = [
  {
    logo: require("../../assets/javascript.png"),
    access: true,
    name: "JavaScript",
  },
  {
    logo: require("../../assets/css.png"),
    access: false,
    name: "CSS",
  },
  {
    logo: require("../../assets/react.png"),
    access: false,
    name: "React",
  },
  {
    logo: require("../../assets/java.png"),
    access: false,
    name: "Java",
  },
];
const Home = () => {
  const navigation = useNavigation<any>();
  const [notifications, setNotifications] = useState<boolean>(false);

  return (
    <>
      <ScrollView className="bg-primary">
        <View className="flex-1  py-[60] mb-14 bg-primary">
          <View className="flex-row mb-5 mx-10">
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
          <View className="mt-32 bg-semi-transparent h-full  flex items-center justify-center  relative border border-t-borderColorSemiTransparent">
            <View className="absolute bottom-[819]">
              <View className="relative flex-1 justify-center items-center h-screen w-screen">
                <View
                  className="h-32 w-64 bg-primary border absolute border-b-borderColorSemiTransparent border-l-borderColorSemiTransparent  border-r-borderColorSemiTransparent  border-t-primaryBorder
                              rounded-bl-full rounded-br-full  "
                ></View>
              </View>
            </View>
            <View className="flex-1 top-28">
              <View>
                <View className="right-24 mt-7">
                  <H3Text text={"Bezpłatne quizy"} />
                </View>
                {quizes.map((quize, index) => {
                  return (
                    <View className="flex mt-7 mx-4 flex-row items-center justify-start">
                      <QuizeBlock key={index} quize={quize} />
                    </View>
                  );
                })}
              </View>
              <View className="right-[104] mt-7">
                <H3Text text={"Karty fizyczne"} />
              </View>
              <View className="flex-wrap flex-row flex w-full m-4">
                {blockes.map((block, index) => {
                  return <CardBlock key={index} block={block} />;
                })}
              </View>
            </View>
          </View>

          {/* <View className="flex-1">
           <Rings />
        </View> */}
        </View>
      </ScrollView>
      {/* <Tabbar/> */}
    </>
  );
};

export default Home;

const styles = StyleSheet.create({});
