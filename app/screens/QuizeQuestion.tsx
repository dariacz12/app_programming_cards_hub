import React, { useEffect, useRef, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import H2Text from "../components/H2Text";
import QuizeAnswerElement from "../components/QuizeComponents/QuizeAnswerElement";
import QuizeExplanationElement from "../components/QuizeComponents/QuizeExplanationElement";
import ProgressBar from "../components/ProgressBar";
import QuizeQuestionElement from "../components/QuizeComponents/QuizeQuestionElement";
import QuizeSecondaryButton from "../components/QuizeComponents/QuizeSeccondaryButton";
import QuizeActiveButton from "../components/QuizeComponents/QuizeActiveButton";
import useCurrentUser from "../hooks/api/useCurrentUser";
import useQuizeSetData from "../hooks/api/useQuizeSetData";
import useQuizeAttempts from "../hooks/api/useQuizeAttempts";
import { AnswerAttemt } from "../types/AnswerAttemt";
import { QuestionItem } from "../types/QuizeItem";
import { UserQuizeAnswer } from "../types/UserQuizeAnswer";
import { AnswerAttemptQuize } from "../types/AnswerAttemptQuize";
import { saveQuizAttempt } from "../actions/saveQuizeAttempt";
import { Route } from "../types/Route";
import { LastQuizAttemptsResult } from "../types/lastQuizAttemptsResult";

const QuizeQuestion = ({
  route,
}: Route<{ documentId: string; reset: boolean }>) => {
  const { documentId, reset } = route?.params;
  const [chosenAnswersArray, setChosenAnswerArray] = useState<any>([]);
  const scrollView = useRef<ScrollView>(null);
  const navigation = useNavigation<any>();
  const [currentQuestion, changeCurrentQuestion] = useState<any>(0);
  const [chosenAnswer, setChosenAnswer] = useState<any>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [userAnswers, setUserAnswers] = useState<UserQuizeAnswer[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState<UserQuizeAnswer[]>();
  const [filteredQuestionsList, setFilteredQuestionsList] =
    useState<QuestionItem[]>();
  const [isFirstAttempt, setIsFirstAttempt] = useState(true);
  const [lastQuizAttemptsResultAnswers, setLastQuizAttemptsResultsAnswers] =
    useState<AnswerAttemt[]>([]);
  const [lastQuizAttemptsResult, setLastQuizAttemptsResult] =
    useState<LastQuizAttemptsResult>();

  useEffect(() => {
    if (reset) {
      setIsFirstAttempt(true);
    } else if (lastQuizAttemptsResultAnswers.length > 0) {
      setIsFirstAttempt(false);
    } else {
      setIsFirstAttempt(true);
    }
  }, [lastQuizAttemptsResultAnswers, reset]);

  const { data: quizeAttempts } = useQuizeAttempts(navigation, documentId);

  useEffect(() => {
    if (quizeAttempts?.length > 0) {
      setLastQuizAttemptsResultsAnswers(
        quizeAttempts[quizeAttempts.length - 1].answers,
      );
      setLastQuizAttemptsResult(quizeAttempts[quizeAttempts.length - 1]);
    } else {
      setLastQuizAttemptsResultsAnswers([]);
      setLastQuizAttemptsResult({ score: 0 });
    }
  }, [documentId, quizeAttempts]);

  const { data: userData } = useCurrentUser();

  const { data: quizeSetData } = useQuizeSetData(documentId);

  const activeQuestionsList: QuestionItem[] = isFirstAttempt
    ? quizeSetData?.quiz_questions_elements || []
    : filteredQuestionsList || [];

  let currentQuestionId = activeQuestionsList?.[currentQuestion]?.documentId;

  useEffect(() => {
    const incorrectQuestionIds = lastQuizAttemptsResultAnswers
      .filter((attempt) => !attempt.isCorrect)
      .map((attempt) => attempt.question);
    const filteredQuestionsList = quizeSetData?.quiz_questions_elements.filter(
      (question) => incorrectQuestionIds.includes(question.documentId),
    );
    setFilteredQuestionsList(filteredQuestionsList);
  }, [quizeSetData?.quiz_questions_elements, lastQuizAttemptsResultAnswers]);

  useEffect(() => {
    setChosenAnswer(null);
    chosenAnswersArray[currentQuestion]
      ? setIsButtonDisabled(true)
      : setIsButtonDisabled(false);
  }, [currentQuestion]);

  const handleAnswerSelection = (answer: AnswerAttemptQuize) => {
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
          ({ answerLetter }) => answerLetter === chosenAnswer,
        );
      setShowExplanation(isShowExplanation?.isCorrect ? false : true);
    }
  }, [chosenAnswer]);

  const goCurrentQuesttion = () => {
    currentQuestion > 0 && changeCurrentQuestion(currentQuestion - 1);
  };

  const nextQuestion = async (chosenAnswer: string) => {
    if (chosenAnswer || chosenAnswersArray[currentQuestion]) {
      if (currentQuestion < activeQuestionsList.length - 1) {
        changeCurrentQuestion(currentQuestion + 1);
      } else {
        try {
          let response;
          correctAnswers &&
            quizeSetData &&
            lastQuizAttemptsResult &&
            (response = await saveQuizAttempt(
              userAnswers,
              correctAnswers,
              quizeSetData,
              lastQuizAttemptsResultAnswers,
              lastQuizAttemptsResult,
              documentId,
            ));
          if (response?.status === 200) {
            navigation.navigate("QuizeResultPage", {
              documentId: documentId,
              userId: userData?.id,
              questionsList: quizeSetData?.quiz_questions_elements,
            });
          }
        } catch (error) {
          console.error("Error saving quiz attempt:", error);
        }
      }
      if (chosenAnswer) {
        setChosenAnswerArray([...chosenAnswersArray, chosenAnswer]);
      }
    }
    setChosenAnswer(null);
  };

  useEffect(() => {
    const correctAnswers: UserQuizeAnswer[] = activeQuestionsList
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
      .filter((answer) => answer !== null) as UserQuizeAnswer[];
    setCorrectAnswers(correctAnswers);
  }, [documentId, activeQuestionsList]);

  return (
    <>
      {activeQuestionsList && (
        <ScrollView ref={scrollView} className="bg-semi-transparent">
          <View className="flex-1">
            <View className=" flex-1 mt-20 mb-8 mx-10">
              <View className="flex-1 items-center flex-row ">
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("QuizeStartPage", {
                      documentId: documentId,
                    })
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
                (answer: AnswerAttemptQuize, index: number) => {
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
