import { AntDesign } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import H2Text from '../components/H2Text'
import ProgressBar from '../components/ProgressBar'
import { useNavigation } from '@react-navigation/native'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import FlipCard from '../components/FlipCard'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'

const CardsStudyPage = () => {
  const navigation = useNavigation<any>();
  const numberWrong = 4;
  const numberRight = 15;
  const [currentQuestion, changeCurrentQuestion] = useState<any>(0)
  const cardsList =[
    {
        question:"Wyjaśnij na czym polega Event Delegation?",
        answer:  require('../../assets/cardAnswer1.png')
    },
    {
      question:"2.W jaki sposób przekazuje się dane do komponentu?",
      answer:  require('../../assets/cardAnswer1.png')
    },
    {
    question:"3.W jaki sposób przekazuje się dane do komponentu?",
    answer:  require('../../assets/cardAnswer1.png')
    },
]  

const isFlipped = useSharedValue(false);

const handlePress = () => {
  isFlipped.value = !isFlipped.value;
};


const isPressed = useSharedValue(false);
const offset = useSharedValue({ x: 0, y: 0 });

const animatedStyles = useAnimatedStyle(() => {
  return {
    transform: [
      { translateX: offset.value.x },
      { translateY: offset.value.y },
      { scale: withSpring(isPressed.value ? 1.2 : 1) },
    ],
    backgroundColor: isPressed.value ? 'yellow' : 'blue',
    borderRadius:"23px",
  };
});
const start = useSharedValue({ x: 0, y: 0 });

  const gesture = Gesture.Pan()
    .onBegin(() => {
      isPressed.value = true;
    })
    .onUpdate((e) => {
      offset.value = {
        x: e.translationX + start.value.x,
        y: e.translationY + start.value.y,
      };
    })
    .onEnd(() => {
      start.value = {
        x: offset.value.x,
        y: offset.value.y,
      };
    })
    .onFinalize(() => {
      isPressed.value = false;
    });
  return (
    <>
    <SafeAreaView className="flex-1  bg-primary ">
      <View>
         <View className="flex mt-6 mb-7  mx-10 flex-row ">
                <TouchableOpacity
                  onPress={() => navigation.navigate("QuizeStartPage",{id:1})}
                >
                  <AntDesign name="left" size={24}  color="ghostwhite" />
                </TouchableOpacity>
              <View className=" flex-1 items-center pr-4">
                <H2Text textCenter={true}  text={"React"} />
              </View>     
            </View>
             <ProgressBar completedQuestions={currentQuestion+1} allQuestions={cardsList.length}/>
             <View className='flex mt-1 mb-16 flex-row justify-between relative'>
                <View className='absolute right-[325] mr-2 w-20 h-12 border-2 border-redError rounded-full flex items-end pr-5 justify-center'><Text  className='font-bold text-white'>{numberWrong}</Text></View>
                <View className='absolute left-[335] mr-2 w-20 h-12 border-2 border-greanColor rounded-full flex items-start pl-5 justify-center'><Text  className='font-bold text-white'>{numberRight}</Text></View>
             </View>
             <View className='flex justify-center items-center'>  
              <Pressable  onPress={handlePress}>
              <GestureDetector gesture={gesture}>
                    <Animated.View style={animatedStyles} >
                      <FlipCard
                isFlipped={isFlipped}
                cardStyle={styles.flipCard}
                currentCard={cardsList[currentQuestion]}
              /> 
                  </Animated.View>
                
              </GestureDetector>
              
              
              </Pressable>
            </View> 
      </View>
           
    </SafeAreaView>
   </>
  )
}

export default CardsStudyPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleButton: {
    backgroundColor: '#b58df1',
    padding: 12,
    borderRadius: 48,
  },
  toggleButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  flipCard: {
    width: 320,
    height:500,
  },
});
