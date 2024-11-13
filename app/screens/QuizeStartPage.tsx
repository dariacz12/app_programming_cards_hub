import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Avatar from "../components/Avatar";
import H4Text from "../components/H4Text";
import H1Text from "../components/H1Text";
import InfoCard from "../components/InfoCard";
import ActiveButton from "../components/ActiveButton";
import Slider from "../components/Slider";
import { AntDesign } from "@expo/vector-icons";
import Tabbar from "../components/Tabbar";
import ProgressCircular from "../components/ProgressCircular";
import axios from "axios";
import { API_URL } from "../context/AuthContext";

const QuizeStartPage = ({ route }: { route: any }) => {
  const { documentId } = route?.params;

  const scrollView = useRef<ScrollView>(null);
  const navigation = useNavigation<any>();

  const [quizData, setQuizData] = useState<any>();

  useEffect(() => {
    const getQuizData = async () => {
      try {
        const data = await axios.get(
          `${API_URL}/quizes/${documentId}?populate[sliderPhotos]=*`,
        );
        setQuizData(data.data.data);
      } catch (e) {
        return { error: true, msg: (e as any).response.data.msg };
      }
    };
    getQuizData();
  }, [documentId]);

  return (
    <>
      {quizData && (
        <ScrollView ref={scrollView} className="bg-primary">
          <View className=" pb-[60] mb-20">
            <View className="flex relative">
              <TouchableOpacity
                className="absolute z-10 p-2 left-10 top-16"
                onPress={() =>
                  navigation.navigate("Tabbar", {
                    screen: "Home",
                  })
                }
              >
                <AntDesign name="left" size={24} color="ghostwhite" />
              </TouchableOpacity>

              <View className="mb-4 flex-1  w-full">
                <Slider photos={quizData.sliderPhotos} />
              </View>
            </View>
            <View className="mt-2 mx-10">
              <View className="w-full flex-1 h-full   flex-row">
                <View className="pr-6">
                  <TouchableOpacity
                    className=""
                    onPress={() =>
                      navigation.navigate("Tabbar", {
                        screen: "Home",
                      })
                    }
                  >
                    <ProgressCircular
                      name={quizData.name}
                      percentage={80}
                      radius={11}
                      strokeWidth={5}
                      duration={500}
                      color={quizData.circleProgressColor}
                      delay={0}
                      max={100}
                    />
                  </TouchableOpacity>
                </View>
                <View className="justify-center items-start ">
                  <H1Text text={quizData.name} />
                  <Text className="text-sm  text-secondary">
                    rozwiązano 65 z 100 pytań
                  </Text>
                </View>
              </View>
            </View>
            <InfoCard welcomeScreen={false}>
              <Text className="leading-5 text-base text-secondary px-4">
                {quizData.description}
              </Text>
            </InfoCard>
            <View className="flex-1 pt-1 justify-center items-center w-full">
              <ActiveButton
                onPress={() =>
                  navigation.navigate("QuizeQuestion", {
                    documentId: documentId,
                  })
                }
                text={"Rozpocznij"}
              />
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default QuizeStartPage;
