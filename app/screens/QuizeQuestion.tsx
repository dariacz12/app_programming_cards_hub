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
import axios from "axios";

const QuizeQuestion = ({ route }: { route: any }) => {
  const { documentId } = route?.params;
  const [chosenAnswersArray, setChosenAnswerArray] = useState<any>([]);
  const scrollView = useRef<ScrollView>(null);
  const navigation = useNavigation<any>();
  const [currentQuestion, changeCurrentQuestion] = useState<any>(0);
  const [chosenAnswer, setChosenAnswer] = useState<any>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const [questionsList, setQuestionsList] = useState<any>();
  console.log("quizeQuestionsData", questionsList?.[0]);

  useEffect(() => {
    const getQuizData = async () => {
      try {
        const data = await axios.get(
          `${API_URL}/quizes/${documentId}?populate[quiz_questions_elements][populate][quiz_answer_options]=*`,
        );
        setQuestionsList(data.data.data.quiz_questions_elements);
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
  const handleAnswerSelection = (answer: any) => {
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
    chosenAnswer || chosenAnswersArray[currentQuestion]
      ? currentQuestion < questionsList.length - 1
        ? changeCurrentQuestion(currentQuestion + 1)
        : navigation.navigate("QuizeResultPage")
      : null;
    chosenAnswer && setChosenAnswerArray([...chosenAnswersArray, chosenAnswer]);
    //  setIsButtonDisabled(true);
    setChosenAnswer(null);
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
            <View className="flex-1">
              <QuizeQuestionElement
                question={questionsList[currentQuestion].question}
              />
            </View>
            <View>
              {questionsList[currentQuestion].quiz_answer_options.map(
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
