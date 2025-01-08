import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import H2Text from "../components/H2Text";
import ProgressBar from "../components/ProgressBar";
import { useNavigation } from "@react-navigation/native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import FlipCard from "../components/FlipCard";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { API_URL } from "../context/AuthContext";
import axios from "axios";
import { CardsCategoryProps } from "../types/CardsCategoryProps";
import { CardItem } from "../types/CardItem";
import { CardsAttempt } from "../types/CardAttempt";
import { AnswerAttemt } from "../types/AnswerAttemt";
import { UserAnswer } from "../types/UserAnswer";

const CardsStudyPage = ({ route }: { route: any }) => {
  const { documentId, reset, cardCategoryId, cardTest } = route?.params;
  const navigation = useNavigation<any>();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<any>(0);
  const [score, setScore] = useState<number>(0);
  const [incorrect, setIncorrect] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const animatedValue = useSharedValue(0);
  const [cardData, setCardData] = useState<CardItem[]>([]);
  console.log("cardData", cardData);
  console.log("cardCategoryId", cardCategoryId);
  // useEffect(() => {
  //   const getCardData = async () => {
  //     try {
  //       const data = await axios.get(
  //         `${API_URL}/cards-items?populate[answerImage]=*&populate[cards_categories]=*&populate[cards]=*`,
  //       );
  //       setCardData(
  //         data.data.data.filter(
  //           (item: any) => item.cards[0].documentId === documentId,
  //         ),
  //       );
  //     } catch (e) {
  //       console.log("e", e);
  //       return { error: true, msg: (e as any).response.data.msg };
  //     }
  //   };
  //   getCardData();
  // }, [documentId]);
  useEffect(() => {
    const getCardData = async () => {
      try {
        console.log(
          "Fetching data with documentId:",
          documentId,
          "and cardCategoryId:",
          cardCategoryId,
        );
        let response;
        if (cardTest) {
          response = await axios.get(
            `${API_URL}/cards/${documentId}?populate[cards_items][populate][answerImage]=*&populate[cards_categories]=*&filters[cards_items][toTest][$eq]=${cardTest}`,
          );
        } else if (cardCategoryId) {
          console.log("dupka", cardCategoryId);
          // Uzycie koncowki cards/id zwraca jedną karte zgodnie ze swaggerem i nie działają dla nich filtry
          // Trzeba uzyć koncowki [GET] /cards i na niej filtrami pofiltorwać po kursie i po kategorii
          response = await axios.get(
            `${API_URL}/cards/${documentId}?populate[cards_items][populate][answerImage]=*&populate[cards_categories]=*&filters[cards_categories][documentId][$eq]=${cardCategoryId}`,
          );
          console.log(9998, response.data.data.cards_items);
          console.log("-----------------------------------------------");
        } else {
          response = await axios.get(
            `${API_URL}/cards/${documentId}?populate[cards_items][populate][answerImage]=*&populate[cards_categories]=*`,
          );
        }
        setCardData(response.data.data.cards_items);
      } catch (e) {
        console.log("Error fetching card data:", e);
        return {
          error: true,
          msg: (e as any).response?.data?.msg || "An error occurred",
        };
      }
    };

    getCardData();
  }, [documentId, cardCategoryId, cardTest]);

  const [isFirstAttempt, setIsFirstAttempt] = useState(true);
  const [filteredQuestionsList, setFilteredQuestionsList] =
    useState<CardItem[]>();
  const activeQuestionsList: CardItem[] = isFirstAttempt
    ? cardData || []
    : filteredQuestionsList || [];
  const [lastCardsAttemptsResultAnswers, setLastCardsAttemptsResultsAnswers] =
    useState<AnswerAttemt[]>([]);
  const [lastCardsAttemptsResult, setLastCardsAttemptsResult] =
    useState<CardsAttempt>();

  useEffect(() => {
    if (reset) {
      setIsFirstAttempt(true);
    } else if (lastCardsAttemptsResultAnswers.length > 0) {
      setIsFirstAttempt(false);
    } else {
      setIsFirstAttempt(true);
    }
  }, [lastCardsAttemptsResultAnswers, reset]);

  const [newData, setNewData] = useState(activeQuestionsList);
  const MAX = 3;
  useEffect(() => {
    setNewData(activeQuestionsList);
  }, [activeQuestionsList]);

  useEffect(() => {
    const getQuizData = async () => {
      try {
        const { data } = await axios.get(
          `${API_URL}/cards-attempts?filters[card][documentId][$eq]=${documentId}`,
        );
        const allAttemtsResults = data.data;
        if (allAttemtsResults?.length > 0) {
          setLastCardsAttemptsResultsAnswers(
            allAttemtsResults[allAttemtsResults.length - 1].answers,
          );
          setLastCardsAttemptsResult(
            allAttemtsResults[allAttemtsResults.length - 1],
          );
        } else {
          setLastCardsAttemptsResultsAnswers([]);
        }
      } catch (e) {
        return { error: true, msg: (e as any).response.data.msg };
      }
    };
    getQuizData();
  }, [documentId]);

  useEffect(() => {
    const incorrectQuestionIds = lastCardsAttemptsResultAnswers
      .filter((attempt) => !attempt.isCorrect)
      .map((attempt) => attempt.question);
    const filteredQuestionsList = cardData.filter((question) =>
      incorrectQuestionIds.includes(question.documentId),
    );
    setFilteredQuestionsList(filteredQuestionsList);
  }, [cardData, lastCardsAttemptsResultAnswers]);
  return (
    <>
      {activeQuestionsList && (
        <SafeAreaView className="flex-1  bg-primary ">
          <View>
            <View className="flex mt-6 mb-7  mx-10 flex-row ">
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("CardsStartPage", {
                    documentId: documentId,
                  })
                }
              >
                <AntDesign name="left" size={24} color="ghostwhite" />
              </TouchableOpacity>
              <View className=" flex-1 items-center pr-4">
                <H2Text textCenter={true} text={"React"} />
              </View>
            </View>
            <ProgressBar
              completedQuestions={currentQuestionIndex + 1}
              allQuestions={activeQuestionsList.length}
            />
            <View className="flex mt-1 mb-16 flex-row justify-between relative">
              <View className="absolute right-[325] mr-2 w-20 h-12 border-2 border-redError rounded-full flex items-end pr-5 justify-center">
                <Text className="font-bold text-white">{incorrect}</Text>
              </View>
              <View className="absolute left-[335] mr-2 w-20 h-12 border-2 border-greanColor rounded-full flex items-start pl-5 justify-center">
                <Text className="font-bold text-white">{score}</Text>
              </View>
            </View>
            <View className="flex justify-center items-center">
              <GestureHandlerRootView>
                <SafeAreaView>
                  <View style={styles.cardContainer}>
                    {newData.map((item: CardItem, index: number) => {
                      if (
                        index > currentQuestionIndex + MAX ||
                        index < currentQuestionIndex
                      ) {
                        return null;
                      }
                      return (
                        <View
                          key={index}
                          style={{ zIndex: activeQuestionsList.length - index }}
                        >
                          <FlipCard
                            documentId={documentId}
                            cardStyle={styles.flipCard}
                            currentCard={item}
                            index={index}
                            key={index}
                            dataLength={activeQuestionsList.length}
                            maxVisibleItem={MAX}
                            currentIndex={currentQuestionIndex}
                            animatedValue={animatedValue}
                            setCurrentQuestionIndex={setCurrentQuestionIndex}
                            setNewData={setNewData}
                            activeQuestionsList={activeQuestionsList}
                            userAnswers={userAnswers}
                            setUserAnswers={setUserAnswers}
                            score={score}
                            setScore={setScore}
                            incorrect={incorrect}
                            setIncorrect={setIncorrect}
                            cardData={cardData}
                            lastCardsAttemptsResultAnswers={
                              lastCardsAttemptsResultAnswers
                            }
                            lastCardsAttemptsResult={lastCardsAttemptsResult}
                          />
                        </View>
                      );
                    })}
                  </View>
                </SafeAreaView>
              </GestureHandlerRootView>
            </View>
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export default CardsStudyPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 300,
    alignItems: "center",
    justifyContent: "center",
  },
  cardContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    marginTop: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  toggleButton: {
    backgroundColor: "#b58df1",
    padding: 12,
    borderRadius: 48,
  },

  toggleButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  flipCard: {
    width: 320,
    height: 500,
  },
});
