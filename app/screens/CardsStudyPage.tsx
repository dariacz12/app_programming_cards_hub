import { AntDesign } from '@expo/vector-icons'
import React, { useState } from 'react'
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import H2Text from '../components/H2Text'
import ProgressBar from '../components/ProgressBar'
import QuizeQuestionElement from '../components/QuizeComponents/QuizeQuestionElement'
import { useNavigation } from '@react-navigation/native'

const CardsStudyPage = () => {
  const navigation = useNavigation<any>();
  const [currentQuestion, changeCurrentQuestion] = useState<any>(0)
  const numberWrong = 4;
  const numberRight = 15;
  const cardsList =[
    {
        question:"W jaki sposób przekazuje się dane do komponentu?",
        answers:[
            {id: "a",
             question:"Za pomocą kontekstu",
             status:false,
            },
            {id: "b",
             text:"Za pomocą propsów",
             status:true,
            },
            {id: "c",
             text:"Za pomocą state",
             status:false,
            },
            {id: "d",
             text:"Za pomocą routingu",
             status:false,
            },
        ],
        explanation:"b. Za pomocą propsów jest odpowiedzią prawidłową, poniewa propsy są standardowym sposobem przekazywania danych do komponentów w Reacie."
    },
    {
        question:"W jaki sposób przekazuje się dane do komponentu? (pyt2)",
        answers:[
            {id: "a",
                text:"Za pomocą kontekstu 2",
                status:true,
               },
               {id: "b",
                text:"Za pomocą propsów 2",
                status:false,
               },
               {id: "c",
                text:"Za pomocą state 2",
                status:false,
               },
               {id: "d",
                text:"Za pomocą routingu 2",
                status:false,
               },
        ],
        explanation:"b. Za pomocą propsów jest odpowiedzią prawidłową, poniewa propsy są standardowym sposobem przekazywania danych do komponentów w Reacie."
    },
    {
        question:"W jaki sposób przekazuje się dane do komponentu? (pyt3)",
        answers:[
            {id: "a",
                text:"Za pomocą kontekstu 3",
                status:false,
               },
               {id: "b",
                text:"Za pomocą propsów 3",
                status:false,
               },
               {id: "c",
                text:"Za pomocą state 3",
                status:false,
               },
               {id: "d",
                text:"Za pomocą routingu 3",
                status:true,
               },
        ],
        explanation:"b. Za pomocą propsów jest odpowiedzią prawidłową, poniewa propsy są standardowym sposobem przekazywania danych do komponentów w Reacie."
    },


]
  return (
    <>
    <SafeAreaView className="flex-1  bg-primary ">
      <View>
         <View className="flex mt-6 mb-10  mx-10 flex-row ">
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
             <View className='flex mt-4 flex-row justify-between relative'>
                <View className='absolute right-[325] mr-2 w-20 h-12 border-2 border-redError rounded-full flex items-end pr-5 justify-center'><Text  className='font-bold text-white'>{numberWrong}</Text></View>
                <View className='absolute left-[335] mr-2 w-20 h-12 border-2 border-greanColor rounded-full flex items-start pl-5 justify-center'><Text  className='font-bold text-white'>{numberRight}</Text></View>
             </View>
      </View>
           
    </SafeAreaView>
   </>
  )
}

export default CardsStudyPage