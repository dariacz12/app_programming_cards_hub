import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import H2Text from "../components/H2Text";
import QuizeSecondaryButton from "../components/QuizeComponents/QuizeSeccondaryButton";
import QuizeActiveButton from "../components/QuizeComponents/QuizeActiveButton";
import { SafeAreaView } from "react-native-safe-area-context";
import Animation from "../components/Animation";
import H3Text from "../components/H3Text";
import InfoCard from "../components/InfoCard";
import ProgressCircular from "../components/ProgressCircular";
import axios from "axios";
import { API_URL } from "../context/AuthContext";

function QuizeResultPage({ route }: { route: any }) {
  const { documentId, userId } = route?.params;
  const animationSource = require("../../assets/congratulations.json");
  const scrollView = useRef<ScrollView>(null);
  const navigation = useNavigation<any>();
  const name = "React";
  const percentage = 50;
  const [latestQuizeAtttemtResult, setLatestQuizeAtttemtResult] =
    useState<any>();

  const [quizAttemptResults, setQuizAttemptResults] = useState<any>();

  useEffect(() => {
    if (!userId) {
      console.log("Skipping quiz fetch as userId is undefined.");
      return;
    }

    const getQuizData = async () => {
      console.log("Fetching quiz data for userId:", userId);
      console.log("Before API request...");

      try {
        const { data } = await axios.get(`${API_URL}/quize-attempts`);

        console.log("After API request...");
        console.log("Full API response:", data);
        setQuizAttemptResults(data.data);
      } catch (e) {
        console.error("Error in API request:", e.message);
        return {
          error: true,
          msg: e.response ? e.response.data.msg : "Unknown error",
        };
      }
    };

    getQuizData();
  }, [userId]);
  // useEffect(() => {

  // }, [quizAttemptResults]);
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
          <View className="mt-44">
            <ProgressCircular
              name={name}
              percentage={percentage}
              radius={35}
              strokeWidth={14}
              duration={500}
              color={"#9E4784"}
              delay={0}
              max={100}
            />
          </View>
        </View>

        <View className="mt-44 bg-semi-transparent h-full  flex items-center justify-center  border border-t-borderColorSemiTransparent ">
          <View className="flex-1 flex-col top-44">
            <View className="">
              <H3Text color={"green"} text={"Świetnie Ci idzie!"}></H3Text>
            </View>
            <View className="">
              <InfoCard isFlex1={false} welcomeScreen={false} isQuize={true}>
                <Text className="leading-5 text-base text-secondary px-4">
                  <Text className="font-bold text-primary">
                    Mistrzu kodu, quiz zaliczony!
                  </Text>{" "}
                  {"\n"} {"\n"}
                  Brawo! Ukończyłeś quiz i udowodniłeś, że kodowanie nie ma
                  przed Tobą tajemnic!
                </Text>
              </InfoCard>
            </View>
          </View>
        </View>
        <View className="absolute top-[351]">
          <View className="relative justify-center items-center  w-screen">
            <View
              className="h-32 w-64 bg-primary border absolute border-b-borderColorSemiTransparent border-l-borderColorSemiTransparent  border-r-borderColorSemiTransparent  border-t-primaryBorder
                              rounded-bl-full rounded-br-full  "
            ></View>
          </View>
        </View>
        <View className="h-28 w-full bg-primary border  border-borderColorSemiTransparent bottom-0 absolute z-2 flex-1 flex-row justify-center items-center">
          <QuizeSecondaryButton
            isResultPage={true}
            onPress={() =>
              navigation.navigate("Tabbar", {
                screen: "Home",
              })
            }
          >
            {"Wybierz quize"}
          </QuizeSecondaryButton>
          <View className="w-4"></View>
          <QuizeActiveButton
            isResultPage={true}
            onPress={() => {
              navigation.navigate("QuizeStartPage", { id: 1 });
            }}
          >
            {"Powtórz quize"}
          </QuizeActiveButton>
        </View>
      </SafeAreaView>
    </>
  );
}

export default QuizeResultPage;
