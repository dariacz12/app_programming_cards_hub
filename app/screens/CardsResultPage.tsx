import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import H2Text from "../components/H2Text";
import QuizeSecondaryButton from "../components/QuizeComponents/QuizeSeccondaryButton";
import QuizeActiveButton from "../components/QuizeComponents/QuizeActiveButton";
import { SafeAreaView } from "react-native-safe-area-context";
import Animation from "../components/Animation";
import H3Text from "../components/H3Text";
import InfoCard from "../components/InfoCard";
import ProgressCircular from "../components/ProgressCircular";
import { resetCards } from "../actions/resetCards";
import useCardSetData from "../hooks/api/useCardSetData";
import useCardsAttempts from "../hooks/api/useCardsAttempts";
import { CardsAttempt } from "../types/CardAttempt";
import { Route } from "../types/Route";

function CardsResultPage({
  route,
}: Route<{ documentId: string; reset: boolean }>) {
  const documentId = route.params?.documentId;
  const animationSource = require("../../assets/congratulations.json");
  const navigation = useNavigation<any>();
  const [lastCardsAttemptsResult, setLastCardsAttemptsResult] =
    useState<CardsAttempt>();
  const [percentage, setPercentage] = useState<number>(0);
  const [remainingQuestions, setRemainingQuestions] = useState<number>(0);
  useEffect(() => {
    lastCardsAttemptsResult &&
      cardData &&
      setPercentage(
        (lastCardsAttemptsResult.score * 100) / cardData?.cards_items.length,
      );
    lastCardsAttemptsResult &&
      cardData &&
      setRemainingQuestions(
        cardData.cards_items.length -
          lastCardsAttemptsResult.score -
          lastCardsAttemptsResult.incorrectAnswers,
      );
  }, [lastCardsAttemptsResult, documentId]);
  const { data: cardData } = useCardSetData(documentId);

  const { data: allAttemtsResults } = useCardsAttempts(documentId);
  useEffect(() => {
    if (allAttemtsResults?.length > 0) {
      setLastCardsAttemptsResult(
        allAttemtsResults[allAttemtsResults.length - 1],
      );
    }
  }, [allAttemtsResults]);

  const handleReset = async () => {
    try {
      const response = await resetCards(cardData, documentId);
      if (response?.status === 200) {
        navigation.navigate("CardsStudyPage", {
          documentId: documentId,
          reset: true,
        });
      }
    } catch {}
  };

  return (
    <>
      {
        <SafeAreaView className="flex-1 justi bg-primary ">
          <View className="flex mt-6  mx-10 flex-row ">
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("UnlockedCardsPage", { documentId })
              }
            >
              <AntDesign name="left" size={24} color="ghostwhite" />
            </TouchableOpacity>
            <View className=" flex-1 items-center pr-4">
              <H2Text textCenter={true} text={cardData?.name} />
            </View>
          </View>
          <View className="flex-1 w-full relative z-30">
            <View className="flex-1 absolute w-full justify-center items-center">
              <Animation source={animationSource} />
            </View>
            <View className="mt-44 ">
              <ProgressCircular
                name={cardData?.name ?? ""}
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
            <View className="flex-1 flex-col top-36">
              <View className="">
                <H3Text color={"#9E4784"} text={"Świetnie Ci idzie!"}></H3Text>
              </View>
              <View className="">
                <InfoCard isFlex1={false} welcomeScreen={false} isQuize={true}>
                  <View className="px-6">
                    <View className="flex flex-row justify-between items-center">
                      <Text className="font-bold text-greanColor">Umiem</Text>
                      <View className="mr-2 w-9 h-8 border-2 border-greanColor rounded-full flex items-center justify-center">
                        <Text className="font-bold text-white">
                          {lastCardsAttemptsResult?.score}
                        </Text>
                      </View>
                    </View>
                    <View className="h-2"></View>
                    <View className="flex flex-row justify-between items-center">
                      <Text className="font-bold text-redError">
                        Wciąż ucze się
                      </Text>
                      <View className="mr-2 w-9 h-8 border-2 border-redError rounded-full flex items-center justify-center">
                        <Text className="font-bold text-white">
                          {lastCardsAttemptsResult?.incorrectAnswers}
                        </Text>
                      </View>
                    </View>
                    <View className="h-2"></View>
                    <View className="flex flex-row justify-between items-center">
                      <Text className="font-bold text-grey">
                        Liczba pozostałych pojęć
                      </Text>
                      <View className="mr-2 w-9 h-8 border-2 border-grey rounded-full flex items-center justify-center">
                        <Text className="font-bold text-white">
                          {remainingQuestions}
                        </Text>
                      </View>
                    </View>
                  </View>
                </InfoCard>
              </View>
              <View className="flex flex-row justify-center mt-2 items-center">
                <QuizeSecondaryButton
                  isResultPage={true}
                  onPress={() =>
                    navigation.navigate("UnlockedCardsPage", { documentId })
                  }
                >
                  {"Wybierz kategorię"}
                </QuizeSecondaryButton>
                <View className="w-4"></View>
                {percentage === 100 ? (
                  <QuizeActiveButton isResultPage={true} onPress={handleReset}>
                    {"Resetuj"}
                  </QuizeActiveButton>
                ) : (
                  <QuizeActiveButton
                    isResultPage={true}
                    onPress={() => {
                      navigation.navigate("CardsStudyPage", { documentId });
                    }}
                  >
                    {"Kontynuuj naukę"}
                  </QuizeActiveButton>
                )}
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
          <View></View>
        </SafeAreaView>
      }
    </>
  );
}

export default CardsResultPage;
