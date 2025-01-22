import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import H1Text from "../components/H1Text";
import InfoCard from "../components/InfoCard";
import ActiveButton from "../components/ActiveButton";
import Slider from "../components/Slider";
import { AntDesign } from "@expo/vector-icons";
import H3Text from "../components/H3Text";
import { useForm } from "react-hook-form";
import CategoryElement from "../components/CategoryElement";
import ProgressCircular from "../components/ProgressCircular";
import { resetCards } from "../actions/resetCards";
import { CardsAttempt } from "../types/CardAttempt";
import { CardSetData } from "../types/CardSetData";
import { CardsCategoryProps } from "../types/CardsCategoryProps";
import useCardsAttempts from "../hooks/api/useCardsAttempts";
import useCardSetData from "../hooks/api/useCardSetData";
import { Route } from "../types/Route";
type FormData = {
  kod: string;
};
const UnlockedCardsPage = ({ route }: Route<{ documentId: string }>) => {
  const { documentId } = route?.params;
  const scrollView = useRef<ScrollView>(null);
  const navigation = useNavigation<any>();
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      kod: "",
    },
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [lastCardsAttemptsResult, setLastCardsAttemptsResult] =
    useState<CardsAttempt>();
  const [percentage, setPercentage] = useState<number>(0);

  const {
    data: cardData,
    loading: loadingCardData,
    error: errorCardData,
  } = useCardSetData(documentId);

  useEffect(() => {
    lastCardsAttemptsResult &&
      setPercentage(
        (lastCardsAttemptsResult.score * 100) /
          lastCardsAttemptsResult.totalQuestions,
      );
  }, [lastCardsAttemptsResult, documentId]);

  const {
    data: allAttemtsResults,
    loading: loadingAllAttemtsResults,
    error: errorAllAttemtsResults,
  } = useCardsAttempts(documentId);

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
      <ScrollView ref={scrollView} className="bg-primary ">
        <View className=" pb-[60] mb-4 " key={documentId}>
          <View className="flex relative">
            <TouchableOpacity
              className="absolute z-10 p-2 left-10 top-16"
              onPress={() =>
                navigation.navigate("Tabbar", {
                  screen: "Home",
                })
              }
            >
              <AntDesign name="left" size={24} color="ghostwhite" />
            </TouchableOpacity>

            <View className="mb-4 flex-1  w-full">
              <Slider
                photos={cardData?.sliderPhotos}
                blurHash={cardData?.blurHash}
              />
            </View>
          </View>
          {cardData && (
            <>
              <View className="bg-primary bottom-12 rounded-2xl ">
                <View className="mt-2 mx-10">
                  <View className="w-full flex-1 h-full   flex-row">
                    <View className="pr-6 mt-5">
                      <TouchableOpacity
                        className=""
                        onPress={() =>
                          navigation.navigate("Tabbar", {
                            screen: "Home",
                          })
                        }
                      >
                        <ProgressCircular
                          name={cardData.name}
                          percentage={percentage}
                          radius={11}
                          strokeWidth={5}
                          duration={500}
                          color={cardData.circleProgressColor}
                          delay={0}
                          max={100}
                        />
                      </TouchableOpacity>
                    </View>
                    <View className="justify-center items-start ">
                      <H1Text text={cardData.name} />
                      <Text className="text-sm  text-secondary">
                        rozwiązano 65 z 100 pytań
                      </Text>
                    </View>
                  </View>
                </View>
                <View>
                  <View className="items-start ml-6 mb-3 mt-7 ">
                    <H3Text text={"Mixuj pytania z rónych kategorii"} />
                  </View>

                  <View className="flex-1 py-5 justify-center items-center w-full">
                    {percentage === 100 ? (
                      <ActiveButton onPress={handleReset} text={"Resetuj"} />
                    ) : (
                      <ActiveButton
                        onPress={() => {
                          navigation.navigate("CardsStudyPage", {
                            documentId,
                          });
                        }}
                        text={"Ucz się"}
                      />
                    )}
                  </View>
                  <View className="mx-8  mt-2  bg-block h-1 rounded-lg " />
                </View>
                <View className="items-start ml-6 my-8">
                  <H3Text text={"Wybierz kategorie kart"} />
                </View>
                <View className="flex w-full justify-center mb-4 flex-wrap flex-row">
                  {cardData.cards_categories.map(
                    (cardCategory: CardsCategoryProps) => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate("CardsStudyPage", {
                              documentId,
                              cardCategoryId: cardCategory.documentId,
                            });
                          }}
                        >
                          <CategoryElement
                            key={cardCategory.documentId}
                            nameCategory={cardCategory.nameCategory}
                            url={cardCategory.iconCategory.url}
                            blurHash={cardData?.blurHash}
                          ></CategoryElement>
                        </TouchableOpacity>
                      );
                    },
                  )}
                </View>
                <InfoCard welcomeScreen={false}>
                  <Text className="leading-5 text-base text-secondary px-4">
                    {cardData.description}
                  </Text>
                </InfoCard>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default UnlockedCardsPage;
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
    letterSpacing: 0.3,
  },
});
