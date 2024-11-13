import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useRef } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import H2Text from "../components/H2Text";
import QuizeSecondaryButton from "../components/QuizeComponents/QuizeSeccondaryButton";
import QuizeActiveButton from "../components/QuizeComponents/QuizeActiveButton";
import { SafeAreaView } from "react-native-safe-area-context";
import Animation from "../components/Animation";
import H3Text from "../components/H3Text";
import InfoCard from "../components/InfoCard";
import LanguageLogo from "../components/LanguageLogo";

function AccessUnlocked({ route }: { route?: any }) {
  const { id, logo, name, percentage, color } = route?.params;
  const animationSource = require("../../assets/congratulations.json");
  const scrollView = useRef<ScrollView>(null);
  const navigation = useNavigation<any>();
  return (
    <>
      <SafeAreaView className="flex-1  bg-primary ">
        <View className="flex mt-6  mx-10 flex-row ">
          <TouchableOpacity
            onPress={() => navigation.navigate("QuizeStartPage", { id: 1 })}
          >
            <AntDesign name="left" size={24} color="ghostwhite" />
          </TouchableOpacity>
          <View className=" flex-1 items-center pr-4">
            <H2Text textCenter={true} text={name} />
          </View>
        </View>
        <View className="flex-1 w-full relative z-30">
          <View className="flex-1 absolute w-full justify-center items-center">
            <Animation source={animationSource} />
          </View>
          <View className="flex-1 absolute w-full mt-40 justify-center items-center">
            <Image source={logo} className="w-24 h-24" />
          </View>
        </View>

        <View className="mt-44 bg-semi-transparent h-full  flex items-center justify-center  border border-t-borderColorSemiTransparent ">
          <View className="flex-1 flex-col top-44">
            <View className="">
              <H3Text color={"green"} text={"Uzyskałeś pełny dostęp!"}></H3Text>
            </View>
            <View className="">
              <InfoCard isFlex1={false} welcomeScreen={false} isQuize={true}>
                <Text className="leading-5 text-base text-secondary px-4">
                  <Text className="font-bold text-primary">Gratulacje!</Text>{" "}
                  Teraz możesz sprawdzić swoją wiedzę i umiejętności bez żadnych
                  ograniczeń.
                </Text>
              </InfoCard>
            </View>
          </View>
        </View>
        <View className="absolute top-[347]">
          <View className="relative justify-center items-center  w-screen">
            <View
              className="h-32 w-64 bg-primary border absolute border-b-borderColorSemiTransparent border-l-borderColorSemiTransparent  border-r-borderColorSemiTransparent  border-t-primaryBorder
                              rounded-bl-full rounded-br-full  "
            ></View>
          </View>
        </View>
        <View className="h-28 w-full bg-primary border  border-borderColorSemiTransparent bottom-0 absolute z-2 flex-1 flex-row justify-center items-center">
          <View className="w-4"></View>
          <QuizeActiveButton
            isResultPage={true}
            onPress={() => {
              navigation.navigate("UnlockedCardsPage", {
                id,
                logo,
                name,
                percentage,
                color,
              });
            }}
          >
            {"Rozpocznij"}
          </QuizeActiveButton>
        </View>
      </SafeAreaView>
    </>
  );
}

export default AccessUnlocked;
