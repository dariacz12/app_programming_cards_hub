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
type Quize = {
  documentId: string;
};
type Answer = {
  isCorrect: boolean;
  question: string;
};
type QuizAttempt = {
  answers: Answer[];
  quize: Quize;
  incorrectAnswers: number;
  score: number;
  totalQuestions: number;
};

type QuizAttemptsResults = {
  results: QuizAttempt[];
};

function QuizeResultPage({ route }: { route: any }) {
  const { documentId, userId } = route?.params;
  const animationSource = require("../../assets/congratulations.json");
  const scrollView = useRef<ScrollView>(null);
  const navigation = useNavigation<any>();
  const name = "React";

  const [percentage, setPercentage] = useState<number>(0);
  const [latestQuizeAtttemtResult, setLatestQuizeAtttemtResult] =
    useState<any>();

  const [quizAttemptResult, setQuizAttemptResult] = useState<QuizAttempt>();
  const [mergequizAttemptsResult, setMergeQuizAttemptsResults] =
    useState<QuizAttempt>();
  const [firstAttempt, setFirstAttempt] = useState<number>(0);
  const [nextAttempt, setNextAttempt] = useState<number>(0);
  const [combinedAnswers, setCombinedAnswers] = useState<any>();

  // const getCombinedAnswers = () => {
  //   const length = quizAttemptsResult.length;
  //   if (length < 2) return [];
  //   const lastAttemptAnswers = quizAttemptsResult[length - 1].answers;
  //   const secondLastAttemptAnswers = quizAttemptsResult[length - 2].answers;
  //   const correctAnswersFromLastAttempt = lastAttemptAnswers.filter(
  //     (answer) => answer.isCorrect,
  //   );
  //   const correctAnswersFromSecondLastAttempt = secondLastAttemptAnswers.filter(
  //     (answer) => answer.isCorrect,
  //   );
  //   const incorrectAnswersFromLastAttempt = lastAttemptAnswers.filter(
  //     (answer) => !answer.isCorrect,
  //   );
  //   const combinedAnswersResults = [
  //     ...correctAnswersFromLastAttempt,
  //     ...correctAnswersFromSecondLastAttempt,
  //     ...incorrectAnswersFromLastAttempt,
  //   ];
  //   const uniqueAnswers = combinedAnswersResults.filter(
  //     (answer, index, self) =>
  //       index === self.findIndex((a) => a.question === answer.question),
  //   );

  //   return uniqueAnswers;
  // };
  // console.log("combinedanswers", combinedAnswers);

  useEffect(() => {
    setCombinedAnswers(null);
    const getQuizData = async () => {
      console.log("Before API request...");
      try {
        const { data } = await axios.get(
          `${API_URL}/quize-attempts?populate[quize]=*`,
        );

        console.log("After API request...");
        console.log("Full API response:", data);
        const quizAttemptsResult = data.data.results.filter(
          (attempt: QuizAttempt) => attempt.quize.documentId === documentId,
        );
        setQuizAttemptResult(quizAttemptsResult[quizAttemptsResult.length - 1]);
      } catch (e) {
        return { error: true, msg: (e as any).response.data.msg };
      }
    };

    getQuizData();
  }, []);
  useEffect(() => {
    quizAttemptResult &&
      setPercentage(
        (quizAttemptResult.score * 100) / quizAttemptResult.totalQuestions,
      );
  }, [quizAttemptResult, documentId]);
  // useEffect(() => {
  //   if (allQuizAttemptsResults?.results.length > 0) {
  //     const quizAttemptsResult = allQuizAttemptsResults.results.filter(
  //       (attempt) => attempt.quize.documentId === documentId,
  //     );
  //     setQuizAttemptsResults(quizAttemptsResult);
  //     quizAttemptsResult.length === 1 &&
  //       setFirstAttempt(
  //         (quizAttemptsResult[quizAttemptsResult.length - 1].score * 100) /
  //           quizAttemptsResult[quizAttemptsResult.length - 1].totalQuestions,
  //       );
  //     quizAttemptsResult.length > 1 &&
  //       mergequizAttemptsResult &&
  //       setNextAttempt(
  //         (mergequizAttemptsResult.score * 100) /
  //           mergequizAttemptsResult.totalQuestions,
  //       );
  //   }
  // }, [allQuizAttemptsResults, documentId]);
  // useEffect(() => {
  //   if (quizAttemptsResult.length > 1) {
  //     const combined = getCombinedAnswers();
  //     console.log("Combined Answers Computed:", combined);
  //     setCombinedAnswers(combined);
  //   }
  // }, [quizAttemptsResult]);
  // useEffect(() => {
  //   if (quizAttemptsResult.length > 1 && combinedAnswers) {
  //     setMergeQuizAttemptsResults({
  //       answers: combinedAnswers,
  //       quize: { documentId },
  //       incorrectAnswers:
  //         quizAttemptsResult[quizAttemptsResult.length - 1].incorrectAnswers,
  //       score:
  //         quizAttemptsResult[quizAttemptsResult.length - 1].score +
  //           quizAttemptsResult[quizAttemptsResult.length - 2].score || 0,
  //       totalQuestions:
  //         quizAttemptsResult[quizAttemptsResult.length - 1].totalQuestions,
  //     });
  //   }
  // }, [quizAttemptsResult, combinedAnswers]);

  // useEffect(() => {
  //   const saveQuizAttempt = async () => {
  //     if (mergequizAttemptsResult) {
  //       try {
  //         const quizAttempt = {
  //           data: {
  //             users_permissions_user: userId,
  //             quize: documentId,
  //             answers: JSON.stringify(combinedAnswers),
  //             score: mergequizAttemptsResult.score,
  //             totalQuestions: mergequizAttemptsResult.totalQuestions,
  //             incorrectAnswers: mergequizAttemptsResult.incorrectAnswers,
  //           },
  //         };
  //         console.log("quizAttempt", quizAttempt);
  //         const response = await axios.post(
  //           `${API_URL}/quize-attempts`,
  //           quizAttempt,
  //         );
  //         if (response.status === 200) {
  //           console.log("Wynik quizu zapisany:", response.data);
  //         } else {
  //           console.error(
  //             "Failed to save quiz result, status:",
  //             response.status,
  //           );
  //           console.error("Error response:", response.data);
  //         }
  //       } catch (error) {
  //         if (axios.isAxiosError(error)) {
  //           console.error("Error response data:", error.response?.data);
  //           console.error("Error response status:", error.response?.status);
  //         } else if (error instanceof Error) {
  //           console.error("Error message:", error.message);
  //         } else {
  //           console.error("Unexpected error:", error);
  //         }
  //       }
  //     }
  //   };
  //   saveQuizAttempt();
  // }, [mergequizAttemptsResult]);
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
