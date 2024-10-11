import {
  ScrollView,
  ScrollViewBase,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import H1Text from "../components/H1Text";
import H4Text from "../components/H4Text";
import Avatar from "../components/Avatar";
import { useNavigation } from "@react-navigation/native";
import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Rings } from "../components/SkiaProgressComponents/Rings";
import H3Text from "../components/H3Text";
import CardBlock from "../components/CardBlock";
import Tabbar from "../components/Tabbar";
import QuizeBlock from "../components/QuizeBlock";
import ModalPopup from "../components/ModalPopup";
import { LinearGradient } from "expo-linear-gradient";
import ProgressCircular from "../components/ProgressCircular";
import ArrowBack from "../components/ArrowBack";

const quizes = [
  {
    logo: require("../../assets/react.png"),
    level: [1, 2, 3],
    name: "React",
    percentage: 70,
    color: "#9E4784",
  },
  {
    logo: require("../../assets/css.png"),
    level: [1],
    name: "CSS",
    percentage: 35,
    color: "#66347F",
  },
  {
    logo: require("../../assets/php.png"),
    level: [1, 2, 3],
    name: "PHP",
    percentage: 90,
    color: "#37306B",
  },
  {
    logo: require("../../assets/html.png"),
    level: [1],
    name: "HTML",
    percentage: 0,
    color: "#9E4784",
  },
  {
    logo: require("../../assets/java.png"),
    level: [1, 2],
    name: "Java",
    percentage: 80,
    color: "#66347F",
  },
];
const blockes = [
  {
    id: 1,
    logo: require("../../assets/javascript.png"),
    access: true,
    name: "JavaScript",
    percentage: 80,
    color: "#66347F",
  },
  {
    id: 2,
    logo: require("../../assets/css.png"),
    access: false,
    name: "CSS",
    percentage: 0,
    color: "#9E4784",
  },
  {
    id: 3,
    logo: require("../../assets/react.png"),
    access: false,
    name: "React",
    percentage: 35,
    color: "#66347F",
  },
  {
    id: 4,
    logo: require("../../assets/java.png"),
    access: false,
    name: "Java",
    percentage: 35,
    color: "#66347F",
  },
];

const Home = () => {
  const navigation = useNavigation<any>();
  const [curentQuizeCircle, setCurentQuizeCircle] = useState<number>(0);
  const [notifications, setNotifications] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <ScrollView className="bg-primary">
        <View className=" py-[60] mb-14 bg-primary">
          <View className="flex-row justify-between  mx-10">
            <View style={{ flexDirection: "row", height: 60, width: 156 }}>
              <View className="flex-1 ">
                <TouchableOpacity
                  className=""
                  onPress={() =>
                    navigation.navigate("Tabbar", {
                      screen: "Account",
                    })
                  }
                >
                  <Avatar homeScreen={true} />
                </TouchableOpacity>
              </View>
              <View className="justify-center ml-3">
                <H4Text text={"Dzień dobry!"} />
                <Text className="text-sm  text-secondary">Ruby</Text>
              </View>
            </View>
            <View className="justify-center">
              <TouchableOpacity
                onPress={() => navigation.navigate("Notifications")}
              >
                <View className="relative">
                  <MaterialIcons
                    name="notifications"
                    size={24}
                    color="ghostwhite"
                  />
                  {!notifications && (
                    <View className="absolute top-0 right-0.5  rounded-full bg-yellowColor w-2 h-2"></View>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View className="relative flex z-30">
            <View className="absolute flex-row flex-1 w-full justify-between items-center px-4 top-24 z-50">
              <TouchableOpacity
                onPress={() =>
                  setCurentQuizeCircle(
                    curentQuizeCircle === 0
                      ? quizes.length - 1
                      : curentQuizeCircle - 1,
                  )
                }
              >
                <View className="w-16 h-10 items-center justify-center z-50">
                  <MaterialIcons
                    name="arrow-back-ios"
                    size={24}
                    color="white"
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  setCurentQuizeCircle(
                    curentQuizeCircle === quizes.length - 1
                      ? 0
                      : curentQuizeCircle + 1,
                  )
                }
              >
                <View className="w-16 h-10 items-center justify-center">
                  <AntDesign name="right" size={24} color="white" />
                </View>
              </TouchableOpacity>
            </View>
            <View className="  h-10 top-28 ">
              <ProgressCircular
                isHome={true}
                name={quizes[curentQuizeCircle].name}
                percentage={quizes[curentQuizeCircle].percentage}
                radius={40}
                strokeWidth={14}
                duration={500}
                color={quizes[curentQuizeCircle].color}
                delay={0}
                max={100}
              />
            </View>
          </View>

          <View className="mt-[107] bg-semi-transparent h-full  flex items-center justify-center  relative border border-t-borderColorSemiTransparent ">
            <View className="flex-1 top-28 relative">
              <View>
                <View className="right-24 mt-7">
                  <H3Text text={"Bezpłatne quizy"} />
                </View>
                {quizes.map((quize, index) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("Tabbar", {
                          screen: "QuizeStartPage",
                          params: {
                            id: 1,
                            name: quize.name,
                            percentage: quize.percentage,
                            color: quize.color,
                          },
                        })
                      }
                    >
                      <View className="flex mt-7 mx-4 flex-row items-center justify-start">
                        <QuizeBlock key={index} quize={quize} />
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
              <ModalPopup
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                hideModal={() => setModalVisible(false)}
              >
                <View style={styles.centeredView}>
                  <TouchableWithoutFeedback
                    onPress={() => setModalVisible(true)}
                  >
                    <LinearGradient
                      style={styles.modalView}
                      className="border border-lightborderColor"
                      colors={["rgba(82,78,155,255)", "rgba(54,52,133,255)"]}
                    >
                      <Text
                        style={styles.modalText}
                        className="text-whiteColor"
                      >
                        Talia kart w eleganskim pudełku + jej digital wersja w
                        aplikacji + przykłady w edytorze kodu
                      </Text>
                    </LinearGradient>
                  </TouchableWithoutFeedback>
                </View>
              </ModalPopup>
              <View className="flex-row ju ml-10 mt-7">
                <H3Text text={"Karty fizyczne"} />
                <TouchableOpacity
                  className="px-2 justify-center items-center flex"
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <MaterialCommunityIcons
                    name="open-in-new"
                    size={18}
                    color="#B6B4CA"
                  />
                </TouchableOpacity>
              </View>

              <View className="flex-wrap flex-row flex w-full m-4 mb-32">
                {blockes.map((block, index) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(
                          "Tabbar",
                          block.access
                            ? {
                                screen: "UnlockedCardsPage",
                                params: {
                                  id: block.id,
                                  name: block.name,
                                  percentage: block.percentage,
                                  color: block.color,
                                  logo: block.logo,
                                },
                              }
                            : {
                                screen: "CardsStartPage",
                                params: {
                                  id: block.id,
                                  name: block.name,
                                  percentage: block.percentage,
                                  color: block.color,
                                  logo: block.logo,
                                },
                              },
                        )
                      }
                    >
                      <CardBlock key={index} block={block} />
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>

          <View className="absolute bg-red-300 top-[331] z-1">
            <View className="relative justify-center items-center  w-screen">
              <View
                className="h-32 w-64 bg-primary border absolute border-b-borderColorSemiTransparent border-l-borderColorSemiTransparent  border-r-borderColorSemiTransparent  border-t-primaryBorder
                              rounded-bl-full rounded-br-full  "
              ></View>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    borderRadius: 30,
    paddingVertical: 35,
    paddingHorizontal: 20,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    letterSpacing: 0.4,
  },
});
