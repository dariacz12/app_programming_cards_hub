import React from 'react'
import { Text, View } from 'react-native'

interface Answer {
  text: string;
  status: boolean;
  id: string;
}

interface AnswerProps {
  answer: Answer;
}
const QuizeAnswerElement = ({ answer: { text,  status, id } }: AnswerProps) => {

  return (
    <View className="flex-row  mx-8 my-3 p-8 bg-primary rounded-2xl">
     
        <Text className="text-base text-secondary pr-4">{id}.</Text>
        <Text className="text-base text-primary">{text}</Text>
    </View>
  )
}

export default QuizeAnswerElement