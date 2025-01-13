import { faCloudShowersWater } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Text, View } from "react-native";
import { QuizeAnswerChoose } from "../../types/QuizeAnswerChoose";

const QuizeAnswerElement = ({
  answer,
  chosenAnswer,
  chosenAnswersArray,
  currentQuestion,
}: QuizeAnswerChoose) => {
  return (
    <View
      className={`flex-row  mx-8 my-3 p-8 rounded-2xl ${chosenAnswer === null ? (chosenAnswersArray[currentQuestion] !== answer.answerLetter ? "bg-primary" : answer.isCorrect ? "bg-block border border-greanColor" : "bg-block border border-redError") : chosenAnswer !== answer.answerLetter ? "bg-primary" : answer.isCorrect ? "bg-block border border-greanColor" : "bg-block border border-redError"}`}
    >
      <Text className="text-base text-secondary pr-4">
        {answer.answerLetter}.
      </Text>
      <Text className="text-base text-primary">{answer.answerName}</Text>
    </View>
  );
};

export default QuizeAnswerElement;
