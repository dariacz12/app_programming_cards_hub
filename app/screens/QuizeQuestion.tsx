import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import H2Text from '../components/H2Text';
import QuizeAnswerElement from '../components/QuizeComponents/QuizeAnswerElement';
import QuizeExplanationElement from '../components/QuizeComponents/QuizeExplanationElement';
import ProgressBar from '../components/ProgressBar';
import QuizeQuestionElement from '../components/QuizeComponents/QuizeQuestionElement';
import QuizeSecondaryButton from '../components/QuizeComponents/QuizeSeccondaryButton';
import QuizeActiveButton from '../components/QuizeComponents/QuizeActiveButton';


const QuizeQuestion = () => {
  console.log("pusta",[])
    const [chosenAnswersArray,setChosenAnswerArray] = useState<any>([]);
    const scrollView = useRef<ScrollView>(null);
    const navigation = useNavigation<any>();
    const [currentQuestion, changeCurrentQuestion] = useState<any>(0)
    const [chosenAnswer, setChosenAnswer] = useState<any>(null)
    const [showExplanation, setShowExplanation] = useState<boolean>(false)
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
   useEffect(() => {
           setChosenAnswer(null)
           chosenAnswersArray[currentQuestion]?setIsButtonDisabled(true):setIsButtonDisabled(false); 
          console.log("chosenAnswerArray", chosenAnswersArray)
      }, [currentQuestion]);
    const handleAnswerSelection = (answer: any) => {
        setChosenAnswer(answer.id)
        setIsButtonDisabled(true);
        if (!answer.status) {
            console.log("kot")
            setTimeout(()=>scrollView.current?.scrollToEnd({animated: true})); 
        }
    }
     
      useEffect(() => {
        if (chosenAnswer) { 
            const isShowExplanation = questionsList[currentQuestion].answers.find(
              (answer) => answer.id === chosenAnswer
            );
            setShowExplanation(isShowExplanation?.status ? false: true);
            
          }
      }, [chosenAnswer]);

     const goCurrentQuesttion = () =>{

         currentQuestion>0 && changeCurrentQuestion(currentQuestion-1)
             setTimeout(()=> {
            //  setChosenAnswer(chosenAnswersArray[currentQuestion - 1]); 
            //  setIsButtonDisabled(true)
          });   
         
    };
    const nextQuestion= (chosenAnswer: string)=>{
     (chosenAnswer || chosenAnswersArray[currentQuestion]) ? (currentQuestion<questionsList.length-1 ? changeCurrentQuestion(currentQuestion+1): navigation.navigate("QuizeResultPage")): null;
     chosenAnswer && setChosenAnswerArray([...chosenAnswersArray, chosenAnswer]);
    //  setIsButtonDisabled(true); 
     setChosenAnswer(null);

    };
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
    console.log("length",questionsList.length-1);
  return (
    <>
      <ScrollView ref={scrollView} className="bg-semi-transparent">
        <View className='flex-1'>
        <View className=" flex-1 mt-20 mb-8 mx-10">
              <View className="flex-1 items-center flex-row ">
                <TouchableOpacity
                  onPress={() => navigation.navigate("QuizeStartPage")}
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
                return <TouchableOpacity disabled={isButtonDisabled} onPress={() => handleAnswerSelection(answer)}>
                         <QuizeAnswerElement key={index} answer={answer} chosenAnswer={chosenAnswer} currentQuestion={currentQuestion} chosenAnswersArray={chosenAnswersArray}/>
                       </TouchableOpacity>
                })}
            </View>
      
            {showExplanation && (chosenAnswer || chosenAnswersArray[currentQuestion]) &&
             <View >
                <QuizeExplanationElement  explanation={questionsList[currentQuestion].explanation}/>
            </View>}     
         </View>
        
        </ScrollView>
        <View className='h-24 w-full bg-primary border  border-borderColorSemiTransparent bottom-0 absolute z-2 flex-1 flex-row justify-center items-center'>
    <QuizeSecondaryButton
              onPress={() => {currentQuestion!==0 && goCurrentQuesttion()}}/>
    <View className='w-4'></View>
    <QuizeActiveButton
              onPress={() => nextQuestion(chosenAnswer)}/>
   </View>
     </>
  )
}

export default QuizeQuestion