import React from "react";
import { Text, View } from "react-native";
import H3Text from "../H3Text";

const QuizeQuestionElement = ({ question }: { question: string }) => {
  return (
    <View className=" flex-1 mx-8 my-4  p-4 bg-block border border-borderColorSemiTransparent  rounded-3xl">
      <H3Text text={question} />
    </View>
  );
};

export default QuizeQuestionElement;
