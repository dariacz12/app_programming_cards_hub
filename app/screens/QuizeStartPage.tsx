import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Avatar from "../components/Avatar";
import H4Text from "../components/H4Text";
import H1Text from "../components/H1Text";
import InfoCard from "../components/InfoCard";
import ActiveButton from "../components/ActiveButton";
import Slider from "../components/Slider";
import { AntDesign } from "@expo/vector-icons";
import Tabbar from "../components/Tabbar";
import ProgressCircular from "../components/ProgressCircular";
import axios from "axios";
import { API_URL } from "../context/AuthContext";
import { QuizAttempt } from "./QuizeResultPage";
import { AnswerAttemt, QuestionData, UserAnswer } from "./QuizeQuestion";

const QuizeStartPage = ({ route }: { route: any }) => {
  const { documentId } = route?.params;
  const [userId, setUserId] = useState<any>();
  const scrollView = useRef<ScrollView>(null);
  const navigation = useNavigation<any>();
  const [quizAttemptResult, setQuizAttemptResult] = useState<QuizAttempt>();
  const [quizData, setQuizData] = useState<any>();
  const [refreshAnimation, setRefreshAnimation] = useState(false);
  const [percentage, setPercentage] = useState<number>(0);
  const [questionsList, setQuestionsList] = useState<QuestionData[]>([]);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const user = await axios.get(`${API_URL}/users/me`);
        setUserId(user.data.documentId);
      } catch (e) {
        return { error: true, msg: (e as any).response.data.msg };
      }
    };
    getUserData();
  }, []);

  useEffect(() => {
    const getQuizData = async () => {
      try {
        const { data } = await axios.get(
          `${API_URL}/quizes/${documentId}?populate[quiz_questions_elements][populate][quiz_answer_options]=*`,
        );
        setQuestionsList(data.data.quiz_questions_elements);
      } catch (e) {
        console.log("e", e);
        return { error: true, msg: (e as any).response.data.msg };
      }
    };
    getQuizData();
  }, [documentId]);

  const resetQuize = async () => {
    try {
      const answersAllFalse = questionsList
        ?.map((question) => {
          return {
            question: question.documentId,
            isCorrect: false,
          };
        })
        .filter((answer) => answer !== null) as AnswerAttemt[];

      let answersString = JSON.stringify(answersAllFalse);
      const quizAttempt = {
        data: {
          users_permissions_user: userId,
          quize: documentId,
          answers: answersString,
          score: 0,
          totalQuestions: questionsList?.length,
          incorrectAnswers: questionsList?.length,
        },
      };

      const response = await axios.post(
        `${API_URL}/quize-attempts`,
        quizAttempt,
      );
      if (response.status === 200) {
        console.log("Wynik quizu zapisany:", response.data);
      } else {
        console.error("Failed to save quiz result, status:", response.status);
        console.error("Error response:", response.data);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error response data:", error.response?.data);
        console.error("Error response status:", error.response?.status);
      } else if (error instanceof Error) {
        console.error("Error message:", error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    }
    navigation.navigate("QuizeQuestion", {
      documentId: documentId,
      reset: true,
    });
  };

  useEffect(() => {
    const getQuizData = async () => {
      try {
        const data = await axios.get(
          `${API_URL}/quizes/${documentId}?populate[sliderPhotos]=*`,
        );
        setQuizData(data.data.data);
      } catch (e) {
        return { error: true, msg: (e as any).response.data.msg };
      }
    };
    getQuizData();
  }, [documentId]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      const getQuizData = async () => {
        try {
          const { data } = await axios.get(
            `${API_URL}/quize-attempts?populate[quize]=*`,
          );
          const quizAttemptsResult = data.data.filter(
            (attempt: QuizAttempt) => attempt.quize.documentId === documentId,
          );
          setQuizAttemptResult(
            quizAttemptsResult[quizAttemptsResult.length - 1],
          );
          setRefreshAnimation(true);
        } catch (e) {
          return { error: true, msg: (e as any).response.data.msg };
        }
      };

      getQuizData();
    });
    return unsubscribe;
  }, [navigation, documentId]);

  useEffect(() => {
    if (refreshAnimation) {
      setRefreshAnimation(false);
    }
  }, [refreshAnimation]);
  useEffect(() => {
    quizAttemptResult &&
      setPercentage(
        (quizAttemptResult.score * 100) / quizAttemptResult.totalQuestions,
      );
  }, [quizAttemptResult, documentId]);

  return (
    <>
      {quizData && (
        <ScrollView ref={scrollView} className="bg-primary">
          <View className=" pb-[60] mb-20">
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
                <Slider photos={quizData.sliderPhotos} />
              </View>
            </View>
            <View className="mt-2 mx-10">
              <View className="w-full flex-1 h-full   flex-row">
                <View className="pr-6">
                  <TouchableOpacity
                    className=""
                    onPress={() =>
                      navigation.navigate("Tabbar", {
                        screen: "Home",
                      })
                    }
                  >
                    <ProgressCircular
                      name={quizData.name}
                      percentage={percentage}
                      radius={11}
                      strokeWidth={5}
                      duration={500}
                      color={quizData.circleProgressColor}
                      delay={0}
                      max={100}
                      key={refreshAnimation ? "true" : "false"}
                    />
                  </TouchableOpacity>
                </View>
                <View className="justify-center items-start ">
                  <H1Text text={quizData.name} />
                  <Text className="text-sm  text-secondary">
                    rozwiązano 65 z 100 pytań
                  </Text>
                </View>
              </View>
            </View>
            <InfoCard welcomeScreen={false}>
              <Text className="leading-5 text-base text-secondary px-4">
                {quizData.description}
              </Text>
            </InfoCard>
            <View className="flex-1 pt-1 justify-center items-center w-full">
              {percentage === 100 ? (
                <ActiveButton onPress={() => resetQuize()} text={"Resetuj"} />
              ) : (
                <ActiveButton
                  onPress={() =>
                    navigation.navigate("QuizeQuestion", {
                      documentId: documentId,
                    })
                  }
                  text={"Rozpocznij"}
                />
              )}
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default QuizeStartPage;
