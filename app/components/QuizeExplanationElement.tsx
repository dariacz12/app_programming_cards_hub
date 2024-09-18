import React from 'react'
import { Text, View } from 'react-native'
import H3Text from './H3Text'
import H2Text from './H2Text'

const QuizeExplanationElement = ({explanation}:{explanation: string}) => {
  
  return (
    <>
    <View className='my-5 py-5'>
      <View className='mx-4 my-2 bg-block h-1 rounded-lg '/>
    <View className='p-4 ml-5'>
      <H2Text textCenter={false} text={"Wyjaśnienie:"}/>
    </View>
    <View className=" flex-1 mx-8 my-4  p-7 bg-block border border-borderColorSemiTransparent  rounded-3xl">
        <Text className="text-base text-secondary pr-4">{explanation}</Text>
    </View>
    </View>
    </>
  )
}

export default QuizeExplanationElement