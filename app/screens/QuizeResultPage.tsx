import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useRef } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import H2Text from '../components/H2Text';
import QuizeSecondaryButton from '../components/QuizeComponents/QuizeSeccondaryButton';
import QuizeActiveButton from '../components/QuizeComponents/QuizeActiveButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animation from '../components/Animation';

function QuizeResultPage() {
    const animationSource = require("../../assets/congratulations.json");
    const scrollView = useRef<ScrollView>(null);
    const navigation = useNavigation<any>();
  return (
    <>
        <SafeAreaView className="flex-1 bg-primary ">
     <View className='flex-1'>
        <View className=" flex-1 mt-6  mx-10">
              <View className="flex-1  flex-row ">
                <TouchableOpacity
                  onPress={() => navigation.navigate("QuizeStartPage")}
                >
                  <AntDesign name="left" size={24}  color="ghostwhite" />
                </TouchableOpacity>
              <View className=" flex-1 items-center pr-4">
                <H2Text textCenter={true}  text={"React"} />
            </View>     
            </View>
        
            </View>
            
                {/* <View className="flex-1 justify-start items-start">
                 <Animation source={animationSource} />
                </View> */}
        </View>
        {/* <View className="absolute bg-red-300 top-[331]">
              <View className="relative justify-center items-center  w-screen">
                <View
                  className="h-32 w-64 bg-primary border absolute border-b-borderColorSemiTransparent border-l-borderColorSemiTransparent  border-r-borderColorSemiTransparent  border-t-primaryBorder
                              rounded-bl-full rounded-br-full  "
                ></View>
              </View>
            </View> */}
     <View className='h-24 w-full bg-primary border  border-borderColorSemiTransparent bottom-0 absolute z-2 flex-1 flex-row justify-center items-center'>
    <QuizeSecondaryButton
              onPress={() => {}}/>
    <View className='w-4'></View>
    <QuizeActiveButton
              onPress={() => {}}/>
   </View>
   </SafeAreaView>
    </>
  )
}

export default QuizeResultPage