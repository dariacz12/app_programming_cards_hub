import React from 'react'
import { Text, View } from 'react-native'

interface Answer {
  text: string;
  status: boolean;
  id: string;
}

interface AnswerProps {
  answer: Answer;
 chosenAnswer: string;
}
const QuizeAnswerElement = ({ answer: { text,  status, id }, chosenAnswer }: AnswerProps) => {
 
  return (
    <View className={`flex-row  mx-8 my-3 p-8 rounded-2xl ${ chosenAnswer!==id?"bg-primary": status ? "bg-block border border-greanColor" :"bg-block border border-redError"}`}   >
     
        <Text className="text-base text-secondary pr-4">{id}.</Text>
        <Text className="text-base text-primary">{text}</Text>
    </View>
  )
}

export default QuizeAnswerElement