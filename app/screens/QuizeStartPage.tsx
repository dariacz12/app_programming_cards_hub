import { useNavigation } from '@react-navigation/native';
import React, { useRef } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Avatar from '../components/Avatar';
import H4Text from '../components/H4Text';
import H1Text from '../components/H1Text';
import InfoCard from '../components/InfoCard';
import ActiveButton from '../components/ActiveButton';
import Slider from '../components/Slider';
import { AntDesign } from '@expo/vector-icons';
import Tabbar from '../components/Tabbar';

const QuizeStartPage = () => {
    const quizePhotos = [
        {id: '1',
         src: require('../../assets/react1.png')
        },
        // {id: '2',
        //  src: require('../../assets/react2.png')  
        // },
        {id: '3',
            src: require('../../assets/react3.png')  
        }
        
    ];
    const scrollView = useRef<ScrollView>(null);
    const navigation = useNavigation<any>();
 
  return (
    <>
    <ScrollView ref={scrollView} className="bg-primary">
    <View className=" pb-[60] mb-14">
        <View className='flex relative'>
                <TouchableOpacity className="absolute z-10  left-10 top-20"
                  onPress={() => navigation.goBack()}
                >
                  <AntDesign name="left" size={24}  color="ghostwhite" />
                </TouchableOpacity>    
             
            <View className='mb-4 flex-1  w-full'>
              <Slider quizePhotos={quizePhotos}/>
            </View>
        </View>
          <View className="mt-2 mx-10">
            <View className='w-full flex-1 h-full   flex-row'>
              <View className="pr-6">
                <TouchableOpacity
                  className=""
                  onPress={() => navigation.navigate("Tabbar", {
                    screen: "Account"
                  })}
                >
                  <Avatar homeScreen={true} />
                </TouchableOpacity>
              </View>
              <View className="justify-center items-start ">
                <H1Text text={"React"} />
                <Text className="text-sm  text-secondary">rozwiązano 65 z 100 pytań</Text>
              </View>
            </View>
            </View>
            <InfoCard welcomeScreen={false}>
                <Text className="leading-5 text-base text-secondary px-4">
                Pytania obejmują podstawowe pojęcia Reacta, takie jak propsy i cykl życia komponentu, jak równiez bardziej zaawansowane: routing, zarządzanie stanem itd.
                {"\n"}
                Quiz jest przeznaczony dla osób, które:
                {"\n"}
                • znają podstawy JavaScript,
                {"\n"}
                • mają pewne doświadczenie z Reactem,
                {"\n"}
                • chcą sprawdzić swoją wiedzę z Reacta.
                </Text>
            </InfoCard>
            <View className='flex-1 justify-center items-center w-full'>
                  <ActiveButton onPress={() =>
                         navigation.navigate("QuizeQuestion")
                        }
                        text={"Rozpocznij"}/>
            </View>
          
            </View>
    </ScrollView>
    <Tabbar/>
    </>
  )
}

export default QuizeStartPage