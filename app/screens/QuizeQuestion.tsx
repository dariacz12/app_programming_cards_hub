import React, { useEffect, useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import H4Text from '../components/H4Text'
import { useNavigation } from '@react-navigation/native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import H1Text from '../components/H1Text';
import H2Text from '../components/H2Text';
import QuizeAnswerElement from '../components/QuizeAnswerElement';
import QuizeQuestionElement from '../components/QuizeQuestionElement';
import QuizeExplanationElement from '../components/QuizeExplanationElement';
import { text } from 'd3';
import ProgressBar from '../components/ProgressBar';


const QuizeQuestion = () => {
    const navigation = useNavigation<any>();
    const [currentQuestion, changeCurrentQuestion] = useState<any>(0)
    const [chosenAnswer, setChosenAnswer] = useState<any>(null)
    const [showExplanation, setShowExplanation] = useState<boolean>(false)

    const handleAnswerSelection = (answer: any) => {
        setChosenAnswer(answer.id)
      };
      
      useEffect(() => {
        if (chosenAnswer) { 
            const isShowExplanation = questionsList[currentQuestion].answers.find(
              (answer) => answer.id === chosenAnswer
            );
            setShowExplanation(isShowExplanation?.status ? false: true);
          }
      }, [chosenAnswer]);
    const questionsList=[
        {
            question:"W jaki sposób przekazuje się dane do komponentu?",
            answers:[
                {id: "a",
                 text:"Za pomocą kontekstu",
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
                    status:false,
                   },
                   {id: "b",
                    text:"Za pomocą propsów 2",
                    status:true,
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
                    status:true,
                   },
                   {id: "c",
                    text:"Za pomocą state 3",
                    status:false,
                   },
                   {id: "d",
                    text:"Za pomocą routingu 3",
                    status:false,
                   },
            ],
            explanation:"b. Za pomocą propsów jest odpowiedzią prawidłową, poniewa propsy są standardowym sposobem przekazywania danych do komponentów w Reacie."
        },
   

    ]
  return (
    <>
      <ScrollView className="bg-semi-transparent">
        <View className='flex-1'>
        <View className=" flex-1 mt-20 mb-8 mx-10">
              <View className="flex-1 items-center flex-row ">
                <TouchableOpacity
                  className=""
                  onPress={() => navigation.navigate("")}
                >
                  <AntDesign name="left" size={24}  color="ghostwhite" />
                </TouchableOpacity>
              <View className="justify-center flex-1 items-center pr-4">
                <H2Text textCenter={true}  text={"React"} />
            </View>     
            </View>
            </View>
            <ProgressBar completedQuestions={currentQuestion+1} allQuestions={questionsList.length}/>
            <View className='flex-1'>
               <QuizeQuestionElement question={questionsList[currentQuestion].question}/>
            </View>
            <View>
                {questionsList[currentQuestion].answers.map((answer, index) => {
                return <TouchableOpacity onPress={() => handleAnswerSelection(answer)}>
                         <QuizeAnswerElement key={index} answer={answer} chosenAnswer={chosenAnswer} />
                       </TouchableOpacity>
                })}
            </View>
      
            {showExplanation &&
             <View>
                <QuizeExplanationElement explanation={questionsList[currentQuestion].explanation}/>
            </View>}     
         </View>
        </ScrollView>
     </>
  )
}

export default QuizeQuestion