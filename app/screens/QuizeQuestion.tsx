import React, { useEffect, useRef, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import H2Text from "../components/H2Text";
import QuizeAnswerElement from "../components/QuizeComponents/QuizeAnswerElement";
import QuizeExplanationElement from "../components/QuizeComponents/QuizeExplanationElement";
import ProgressBar from "../components/ProgressBar";
import QuizeQuestionElement from "../components/QuizeComponents/QuizeQuestionElement";
import QuizeSecondaryButton from "../components/QuizeComponents/QuizeSeccondaryButton";
import QuizeActiveButton from "../components/QuizeComponents/QuizeActiveButton";
import { API_URL } from "../context/AuthContext";
import axios, { AxiosError } from "axios";

type Answer = {
  documentId: string;
  isCorrect: boolean;
  answerLetter: string;
  status: boolean;
};
export type UserAnswer = {
  questionId: string;
  answerId: string;
};
export type QuestionData = {
  documentId: string;
  explanation: string;
  question: string;
  quiz_answer_options: Answer[];
};

type Quize = {
  documentId: string;
};
type AnswerAttemt = {
  isCorrect: boolean;
  question: string;
};
export type QuizAttempt = {
  answers: AnswerAttemt[];
  quize: Quize;
  incorrectAnswers: number;
  score: number;
  totalQuestions: number;
};

export type QuizAttemptsResults = {
  results: QuizAttempt[];
};

const QuizeQuestion = ({ route }: { route: any }) => {
  const { documentId } = route?.params;

  useFocusEffect(() => {});

  const [chosenAnswersArray, setChosenAnswerArray] = useState<any>([]);
  const scrollView = useRef<ScrollView>(null);
  const navigation = useNavigation<any>();
  const [currentQuestion, changeCurrentQuestion] = useState<any>(0);
  const [chosenAnswer, setChosenAnswer] = useState<any>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [questionsList, setQuestionsList] = useState<QuestionData[]>([]);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState<UserAnswer[]>();
  const [filteredQuestionsList, setFilteredQuestionsList] =
    useState<QuestionData[]>();
  const [isFirstAttempt, setIsFirstAttempt] = useState(true);
  const activeQuestionsList: QuestionData[] = isFirstAttempt
    ? questionsList || []
    : filteredQuestionsList || [];
  const [userId, setUserId] = useState<any>();
  let currentQuestionId = activeQuestionsList?.[currentQuestion]?.documentId;
  const [lastQuizAttemptsResultAnswers, setLastQuizAttemptsResultsAnswers] =
    useState<AnswerAttemt[]>([]);
  const [lastQuizAttemptsResult, setLastQuizAttemptsResult] =
    useState<QuizAttempt>();
  console.log(
    "lastQuizAttemptsResultAnswers.length",
    lastQuizAttemptsResultAnswers.length,
  );

  useEffect(() => {
    if (lastQuizAttemptsResultAnswers.length > 0) {
      setIsFirstAttempt(false);
    } else {
      setIsFirstAttempt(true);
    }
  }, [lastQuizAttemptsResultAnswers]);

  useEffect(() => {
    const getQuizData = async () => {
      try {
        const { data } = await axios.get(
          `${API_URL}/quize-attempts?filters[quize][documentId][$eq]=${documentId}`,
        );
        const allAttemtsResults = data.data;
        if (allAttemtsResults?.length > 0) {
          setLastQuizAttemptsResultsAnswers(
            allAttemtsResults[allAttemtsResults.length - 1].answers,
          );
          setLastQuizAttemptsResult(
            allAttemtsResults[allAttemtsResults.length - 1],
          );
        } else {
          setLastQuizAttemptsResultsAnswers([]);
        }
      } catch (e) {
        return { error: true, msg: (e as any).response.data.msg };
      }
    };
    getQuizData();
  }, [documentId]);

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

  useEffect(() => {
    const incorrectQuestionIds = lastQuizAttemptsResultAnswers
      .filter((attempt) => !attempt.isCorrect)
      .map((attempt) => attempt.question);
    const filteredQuestionsList = questionsList.filter((question) =>
      incorrectQuestionIds.includes(question.documentId),
    );
    setFilteredQuestionsList(filteredQuestionsList);
  }, [questionsList, lastQuizAttemptsResultAnswers]);

  useEffect(() => {
    setChosenAnswer(null);
    chosenAnswersArray[currentQuestion]
      ? setIsButtonDisabled(true)
      : setIsButtonDisabled(false);
  }, [currentQuestion]);

  const handleAnswerSelection = (answer: Answer) => {
    setUserAnswers((prev) => {
      const existing = prev.find((ans) => ans.questionId === currentQuestionId);
      if (existing) {
        return prev.map((ans) =>
          ans.questionId === currentQuestionId
            ? { ...ans, answerId: answer.documentId }
            : ans,
        );
      } else {
        return [
          ...prev,
          { questionId: currentQuestionId, answerId: answer.documentId },
        ];
      }
    });
    setChosenAnswer(answer.answerLetter);
    setIsButtonDisabled(true);
    if (!answer.status) {
      setTimeout(() => scrollView.current?.scrollToEnd({ animated: true }));
    }
  };

  useEffect(() => {
    if (chosenAnswer) {
      const isShowExplanation =
        activeQuestionsList &&
        activeQuestionsList[currentQuestion].quiz_answer_options.find(
          (answer: any) => answer.answerLetter === chosenAnswer,
        );
      setShowExplanation(isShowExplanation?.isCorrect ? false : true);
    }
  }, [chosenAnswer]);

  const goCurrentQuesttion = () => {
    currentQuestion > 0 && changeCurrentQuestion(currentQuestion - 1);
  };

  const nextQuestion = (chosenAnswer: string) => {
    if (chosenAnswer || chosenAnswersArray[currentQuestion]) {
      if (currentQuestion < activeQuestionsList.length - 1) {
        changeCurrentQuestion(currentQuestion + 1);
      } else {
        saveQuizResult();
        navigation.navigate("QuizeResultPage", {
          documentId: documentId,
          userId: userId,
        });
      }
      if (chosenAnswer) {
        setChosenAnswerArray([...chosenAnswersArray, chosenAnswer]);
      }
    }
    setChosenAnswer(null);
  };

  const getCombinedAnswers = (answersResultCurrentAttempt: AnswerAttemt[]) => {
    const lastAttemptAnswers =
      lastQuizAttemptsResultAnswers.length > 0
        ? lastQuizAttemptsResultAnswers
        : [];

    const currentAttemptAnswers = answersResultCurrentAttempt;
    const correctAnswersFromLastAttempt = lastAttemptAnswers.filter(
      (answer) => answer.isCorrect,
    );
    const correctAnswersFromSecondLastAttempt = currentAttemptAnswers.filter(
      (answer) => answer.isCorrect,
    );
    const incorrectAnswersFromLastAttempt = lastAttemptAnswers.filter(
      (answer) => !answer.isCorrect,
    );
    const combinedAnswersResults = [
      ...correctAnswersFromLastAttempt,
      ...correctAnswersFromSecondLastAttempt,
      ...incorrectAnswersFromLastAttempt,
    ];
    const uniqueAnswers = combinedAnswersResults.filter(
      (answer, index, self) =>
        index === self.findIndex((a) => a.question === answer.question),
    );

    return uniqueAnswers;
  };
  useEffect(() => {
    const correctAnswers: UserAnswer[] = activeQuestionsList
      ?.map((question) => {
        const correctAnswer = question.quiz_answer_options.find(
          (ans) => ans.isCorrect,
        );
        if (correctAnswer) {
          return {
            questionId: question.documentId,
            answerId: correctAnswer.documentId,
          };
        }
        return null;
      })
      .filter((answer) => answer !== null) as UserAnswer[];
    setCorrectAnswers(correctAnswers);
  }, [documentId, activeQuestionsList]);

  const saveQuizResult = async () => {
    try {
      let score = 0;
      let incorrect = 0;
      const answersResultCurrentAttempt = userAnswers.map((userAnswer) => {
        const isCorrect =
          correctAnswers?.some(
            (correctAnswer) =>
              correctAnswer.questionId === userAnswer.questionId &&
              correctAnswer.answerId === userAnswer.answerId,
          ) || false;

        if (isCorrect) {
          score++;
        } else {
          incorrect++;
        }

        return {
          question: userAnswer.questionId,
          isCorrect,
        };
      });

      const totalQuestions = questionsList?.length;
      let answersString;
      if (
        Array.isArray(lastQuizAttemptsResultAnswers) &&
        lastQuizAttemptsResultAnswers?.length > 0
      ) {
        const combinedanswers = getCombinedAnswers(answersResultCurrentAttempt);
        console.log("combinedanswers", combinedanswers);
        answersString = JSON.stringify(combinedanswers);
        lastQuizAttemptsResult &&
          (score = score + lastQuizAttemptsResult?.score);
      } else {
        answersString = JSON.stringify(answersResultCurrentAttempt);
        console.log(" answersString", answersString);
      }
      const quizAttempt = {
        data: {
          // users_permissions_user: userId,
          quize: documentId,
          answers: answersString,
          score,
          totalQuestions,
          incorrectAnswers: incorrect,
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
  };

  return (
    <>
      {activeQuestionsList && (
        <ScrollView ref={scrollView} className="bg-semi-transparent">
          <View className="flex-1">
            <View className=" flex-1 mt-20 mb-8 mx-10">
              <View className="flex-1 items-center flex-row ">
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("QuizeStartPage", { id: 1 })
                  }
                >
                  <AntDesign name="left" size={24} color="ghostwhite" />
                </TouchableOpacity>
                <View className="justify-center flex-1 items-center pr-4">
                  <H2Text textCenter={true} text={"React"} />
                </View>
              </View>
            </View>
            <ProgressBar
              completedQuestions={currentQuestion + 1}
              allQuestions={activeQuestionsList.length}
            />
            {activeQuestionsList && (
              <View className="flex-1">
                <QuizeQuestionElement
                  question={activeQuestionsList[currentQuestion]?.question}
                />
              </View>
            )}
            <View>
              {activeQuestionsList[currentQuestion]?.quiz_answer_options.map(
                (answer: any, index: any) => {
                  return (
                    <TouchableOpacity
                      disabled={isButtonDisabled}
                      onPress={() => handleAnswerSelection(answer)}
                    >
                      <QuizeAnswerElement
                        key={index}
                        answer={answer}
                        chosenAnswer={chosenAnswer}
                        currentQuestion={currentQuestion}
                        chosenAnswersArray={chosenAnswersArray}
                      />
                    </TouchableOpacity>
                  );
                },
              )}
            </View>

            {showExplanation &&
              (chosenAnswer || chosenAnswersArray[currentQuestion]) && (
                <View>
                  <QuizeExplanationElement
                    explanation={
                      activeQuestionsList[currentQuestion].explanation
                    }
                  />
                </View>
              )}
          </View>
        </ScrollView>
      )}
      <View className="h-24 w-full bg-primary border  border-borderColorSemiTransparent bottom-0 absolute z-2 flex-1 flex-row justify-center items-center">
        <QuizeSecondaryButton
          onPress={() => {
            currentQuestion !== 0 && goCurrentQuesttion();
          }}
        >
          {"Cofnij"}
        </QuizeSecondaryButton>
        <View className="w-4"></View>
        <QuizeActiveButton onPress={() => nextQuestion(chosenAnswer)}>
          {"Dalej"}
        </QuizeActiveButton>
      </View>
    </>
  );
};

export default QuizeQuestion;
