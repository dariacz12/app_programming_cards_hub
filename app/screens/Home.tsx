import {
  ScrollView,
  ScrollViewBase,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
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
import { eventEmitter } from "../components/BottomTabs/CustomBottomTab";
import LoadingScreen from "./LoadingScreen";
import useCardListData from "../hooks/api/useCardList";
import useCardList from "../hooks/api/useCardList";
import useQuizeList from "../hooks/api/useQuizeList";
import useCurrentUser from "../hooks/api/useCurrentUser";
// color: "#9E4784",
//  color: "#66347F",
//  color: "#37306B",

const Home = () => {
  const navigation = useNavigation<any>();
  const [curentQuizeCircle, setCurentQuizeCircle] = useState<number>(0);
  const [notifications, setNotifications] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshAnimation, setRefreshAnimation] = useState(false);
  const {
    data: userData,
    loading: loadingUser,
    error: errorUser,
  } = useCurrentUser();
  console.log("userData", userData);
  useEffect(() => {
    if (refreshAnimation) {
      setRefreshAnimation(false);
    }
  }, [refreshAnimation]);

  const {
    data: quizeList,
    loading: loadingQuizeList,
    error: erroQuizList,
  } = useQuizeList(navigation);
  const {
    data: cardList,
    loading: loadingCardlist,
    error: errorCardList,
  } = useCardList();

  // if (loadingQuizeList || loadingCardlist || loadingUser) {
  //   return <LoadingScreen />;
  // }

  return (
    <>
      <ScrollView className="bg-primary">
        <View className=" py-[60] mb-14 bg-primary">
          <View className="flex-row justify-between  mx-10">
            <View style={{ flexDirection: "row", height: 60, width: 156 }}>
              <View className="flex-1 ">
                <TouchableOpacity
                  className=""
                  onPress={() => {
                    navigation.navigate("Tabbar", {
                      screen: "Account",
                    });
                    eventEmitter.emit("updateActiveTab", 2);
                    eventEmitter.emit("animateTab", 2);
                  }}
                >
                  <Avatar homeScreen={true} />
                </TouchableOpacity>
              </View>
              <View className="justify-center ml-3">
                <H4Text text={"Dzień dobry!"} />
                <Text className="text-sm  text-secondary">
                  {userData?.username}
                </Text>
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
                  {notifications && (
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
                      ? quizeList.length - 1
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
                    curentQuizeCircle === quizeList.length - 1
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
              {quizeList.length > 0 && quizeList[curentQuizeCircle] ? (
                <ProgressCircular
                  isHome={true}
                  name={quizeList[curentQuizeCircle].name}
                  percentage={
                    quizeList[curentQuizeCircle].quize_attempts &&
                    quizeList[curentQuizeCircle].quize_attempts.length > 0
                      ? (quizeList[curentQuizeCircle].quize_attempts[
                          quizeList[curentQuizeCircle].quize_attempts.length - 1
                        ].score *
                          100) /
                        quizeList[curentQuizeCircle].quize_attempts[
                          quizeList[curentQuizeCircle].quize_attempts.length - 1
                        ].totalQuestions
                      : 0
                  }
                  radius={40}
                  strokeWidth={14}
                  duration={500}
                  color={quizeList[curentQuizeCircle].circleProgressColor}
                  delay={0}
                  max={100}
                  key={refreshAnimation ? "true" : "false"}
                />
              ) : (
                <Text className="text-white">Loading...</Text>
              )}
            </View>
          </View>

          <View className="mt-[107] bg-semi-transparent h-full  flex items-center justify-center  relative border border-t-borderColorSemiTransparent ">
            <View className="flex-1 top-28 relative">
              <View>
                <View className="right-24 mt-7">
                  <H3Text text={"Bezpłatne quizy"} />
                </View>
                {quizeList?.map((quiz, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() =>
                        navigation.navigate("Tabbar", {
                          screen: "QuizeStartPage",
                          params: {
                            documentId: quiz.documentId,
                          },
                        })
                      }
                    >
                      <View className="flex mt-7 mx-4 flex-row items-center justify-start">
                        <QuizeBlock {...quiz} />
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
                {cardList?.map((block, index) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(
                          "Tabbar",
                          block.access
                            ? {
                                screen: "UnlockedCardsPage",
                                params: {
                                  documentId: block.documentId,
                                },
                              }
                            : {
                                screen: "CardsStartPage",
                                params: {
                                  documentId: block.documentId,
                                },
                              },
                        )
                      }
                    >
                      <CardBlock {...block} />
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
