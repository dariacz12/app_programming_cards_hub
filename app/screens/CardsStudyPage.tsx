import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import H2Text from "../components/H2Text";
import ProgressBar from "../components/ProgressBar";
import { useNavigation } from "@react-navigation/native";
import { useSharedValue } from "react-native-reanimated";
import FlipCard from "../components/FlipCard";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { CardItem } from "../types/CardItem";
import { CardsAttempt } from "../types/CardAttempt";
import { AnswerAttemt } from "../types/AnswerAttemt";
import { UserCardAnswer } from "../types/UserCardAnswer";
import useCardsAttempts from "../hooks/api/useCardsAttempts";
import useCardSetData from "../hooks/api/useCardSetData";
import { Route } from "../types/Route";

const CardsStudyPage = ({
  route,
}: Route<{ documentId: string; reset: boolean }>) => {
  const { documentId, reset } = route?.params;
  const navigation = useNavigation<any>();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<any>(0);
  const [score, setScore] = useState<number>(0);
  const [incorrect, setIncorrect] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<UserCardAnswer[]>([]);
  const animatedValue = useSharedValue(0);

  const { data: cardData } = useCardSetData(documentId);

  const [isFirstAttempt, setIsFirstAttempt] = useState(true);
  const [filteredQuestionsList, setFilteredQuestionsList] =
    useState<CardItem[]>();
  const activeQuestionsList: CardItem[] = isFirstAttempt
    ? cardData?.cards_items || []
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

  const { data: allAttemtsResults } = useCardsAttempts(documentId);

  useEffect(() => {
    const getQuizData = async () => {
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
    };
    getQuizData();
  }, [documentId, allAttemtsResults]);

  useEffect(() => {
    const incorrectQuestionIds = lastCardsAttemptsResultAnswers
      .filter((attempt) => !attempt.isCorrect)
      .map((attempt) => attempt.question);
    const filteredQuestionsList = cardData?.cards_items.filter((question) =>
      incorrectQuestionIds.includes(question.documentId),
    );
    setFilteredQuestionsList(filteredQuestionsList);
  }, [cardData?.cards_items, lastCardsAttemptsResultAnswers]);

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
              completedQuestions={currentQuestionIndex}
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
                          {cardData && (
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
                              cardData={cardData.cards_items}
                              lastCardsAttemptsResultAnswers={
                                lastCardsAttemptsResultAnswers
                              }
                              lastCardsAttemptsResult={lastCardsAttemptsResult}
                            />
                          )}
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
