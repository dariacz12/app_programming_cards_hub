import React, { useEffect, useRef, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
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
type UserAnswer = {
  questionId: string;
  answerId: string;
};
type QuestionData = {
  documentId: string;
  explanation: string;
  question: string;
  quiz_answer_options: Answer[];
};

const QuizeQuestion = ({ route }: { route: any }) => {
  const { documentId } = route?.params;
  console.log("documentId", documentId);
  const [chosenAnswersArray, setChosenAnswerArray] = useState<any>([]);
  const scrollView = useRef<ScrollView>(null);
  const navigation = useNavigation<any>();
  const [currentQuestion, changeCurrentQuestion] = useState<any>(0);
  const [chosenAnswer, setChosenAnswer] = useState<any>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [questionsList, setQuestionsList] = useState<QuestionData[]>([]);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [userId, setUserId] = useState<any>();
  console.log("userId", userId);
  // console.log("questionList", questionsList?.[currentQuestion]);
  // console.log("quizeQuestionsData", questionsList?.[currentQuestion].documentId);
  let currentQuestionId = questionsList?.[currentQuestion]?.documentId;
  // console.log("quizeQuestionsid", currentQuestionId);
  // console.log("answer",questionsList?.[currentQuestion].quiz_answer_options)
  // userAnswers && console.log("useranswers", userAnswers)

  useEffect(() => {
    const getUserData = async () => {
      try {
        const user = await axios.get(`${API_URL}/users/me`);
        console.log(771, user.data);

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
      const isShowExplanation = questionsList[
        currentQuestion
      ].quiz_answer_options.find(
        (answer: any) => answer.answerLetter === chosenAnswer,
      );
      setShowExplanation(isShowExplanation?.isCorrect ? false : true);
    }
  }, [chosenAnswer]);

  const goCurrentQuesttion = () => {
    currentQuestion > 0 && changeCurrentQuestion(currentQuestion - 1);
    setTimeout(() => {
      //  setChosenAnswer(chosenAnswersArray[currentQuestion - 1]);
      //  setIsButtonDisabled(true)
    });
  };

  const nextQuestion = (chosenAnswer: string) => {
    if (chosenAnswer || chosenAnswersArray[currentQuestion]) {
      if (currentQuestion < questionsList.length - 1) {
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

  const saveQuizResult = async () => {
    try {
      const correctAnswers: UserAnswer[] = questionsList
        .map((question) => {
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
      console.log("correctAnswers", correctAnswers);

      let score = 0;
      let incorrect = 0;
      const answersResult = userAnswers.map((userAnswer) => {
        const isCorrect = correctAnswers.some(
          (correctAnswer) =>
            correctAnswer.questionId === userAnswer.questionId &&
            correctAnswer.answerId === userAnswer.answerId,
        );

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

      const totalQuestions = questionsList.length;
      console.log("totalQuestions", totalQuestions);
      console.log("score", score);
      console.log("incorecrt", incorrect);
      const answersString = JSON.stringify(answersResult);

      const quizAttempt = {
        data: {
          users_permissions_user: userId,
          quize: documentId,
          answers: answersString,
          score,
          totalQuestions,
          incorrectAnswers: incorrect,
        },
      };
      console.log("quizAttempt", quizAttempt);
      // Zapisz wynik w Strapi
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
        // Type guard for AxiosError
        console.error("Error response data:", error.response?.data);
        console.error("Error response status:", error.response?.status);
      } else if (error instanceof Error) {
        // Fallback to general Error type
        console.error("Error message:", error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <>
      {questionsList && (
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
              allQuestions={questionsList.length}
            />
            {questionsList && (
              <View className="flex-1">
                <QuizeQuestionElement
                  question={questionsList[currentQuestion]?.question}
                />
              </View>
            )}
            <View>
              {questionsList[currentQuestion]?.quiz_answer_options.map(
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
                    explanation={questionsList[currentQuestion].explanation}
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
