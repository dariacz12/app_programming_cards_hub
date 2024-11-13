import { faCloudShowersWater } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Text, View } from "react-native";

interface Answer {
  answerName: string;
  isCorrect: boolean;
  answerLetter: string;
}

interface AnswerProps {
  answer: Answer;
  chosenAnswer: string;
  chosenAnswersArray: [string];
  currentQuestion: number;
}
const QuizeAnswerElement = ({
  answer: { answerName, isCorrect, answerLetter },
  chosenAnswer,
  chosenAnswersArray,
  currentQuestion,
}: AnswerProps) => {
  return (
    <View
      className={`flex-row  mx-8 my-3 p-8 rounded-2xl ${chosenAnswer === null ? (chosenAnswersArray[currentQuestion] !== answerLetter ? "bg-primary" : isCorrect ? "bg-block border border-greanColor" : "bg-block border border-redError") : chosenAnswer !== answerLetter ? "bg-primary" : isCorrect ? "bg-block border border-greanColor" : "bg-block border border-redError"}`}
    >
      <Text className="text-base text-secondary pr-4">{answerLetter}.</Text>
      <Text className="text-base text-primary">{answerName}</Text>
    </View>
  );
};

export default QuizeAnswerElement;
