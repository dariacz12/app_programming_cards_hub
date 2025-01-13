import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import H1Text from "../components/H1Text";
import InfoCard from "../components/InfoCard";
import ActiveButton from "../components/ActiveButton";
import Slider from "../components/Slider";
import { AntDesign } from "@expo/vector-icons";
import ProgressCircular from "../components/ProgressCircular";
import { resetQuize } from "../actions/resetQuize";
import useCurrentUser from "../hooks/api/useCurrentUser";
import useQuizeSetData from "../hooks/api/useQuizeSetData";
import useQuizeAttempts from "../hooks/api/useQuizeAttempts";
import { QuizAttempt } from "../types/QuizeAttempt";
import { Route } from "../types/Route";

const QuizeStartPage = ({ route }: Route<{ documentId: string }>) => {
  const { documentId } = route?.params;
  const scrollView = useRef<ScrollView>(null);
  const navigation = useNavigation<any>();
  const [quizAttemptResult, setQuizAttemptResult] = useState<QuizAttempt>();
  const [refreshAnimation, setRefreshAnimation] = useState(false);
  const [percentage, setPercentage] = useState<number>(0);
  const { data: userData } = useCurrentUser();
  const { data: quizeSetData } = useQuizeSetData(documentId);

  const { data: quizeAttempts } = useQuizeAttempts(navigation, documentId);

  useEffect(() => {
    if (quizeAttempts && quizeAttempts.length > 0) {
      setQuizAttemptResult(quizeAttempts[quizeAttempts.length - 1]);
    }
  }, [quizeAttempts, documentId]);

  useEffect(() => {
    quizAttemptResult &&
      setPercentage(
        (quizAttemptResult.score * 100) / quizAttemptResult.totalQuestions,
      );
  }, [quizAttemptResult, documentId]);

  useEffect(() => {
    if (refreshAnimation) {
      setRefreshAnimation(false);
    }
  }, [refreshAnimation]);
  useEffect(() => {
    quizAttemptResult &&
      setPercentage(
        (quizAttemptResult.score * 100) / quizAttemptResult.totalQuestions,
      );
  }, [quizAttemptResult, documentId]);

  const handleReset = async () => {
    try {
      const response =
        quizeSetData &&
        userData &&
        (await resetQuize(
          quizeSetData.quiz_questions_elements,
          userData.id,
          documentId,
        ));
      if (response?.status === 200) {
        navigation.navigate("QuizeQuestion", {
          documentId: documentId,
          reset: true,
        });
      }
    } catch {}
  };

  return (
    <>
      {quizeSetData && (
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
                <Slider photos={quizeSetData.sliderPhotos} />
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
                      name={quizeSetData.name}
                      percentage={percentage}
                      radius={11}
                      strokeWidth={5}
                      duration={500}
                      color={quizeSetData.circleProgressColor}
                      delay={0}
                      max={100}
                      key={refreshAnimation ? "true" : "false"}
                    />
                  </TouchableOpacity>
                </View>
                <View className="justify-center items-start ">
                  <H1Text text={quizeSetData.name} />
                  <Text className="text-sm  text-secondary">
                    rozwiązano 65 z 100 pytań
                  </Text>
                </View>
              </View>
            </View>
            <InfoCard welcomeScreen={false}>
              <Text className="leading-5 text-base text-secondary px-4">
                {quizeSetData.description}
              </Text>
            </InfoCard>
            <View className="flex-1 pt-1 justify-center items-center w-full">
              {percentage === 100 ? (
                userData &&
                quizeSetData && (
                  <ActiveButton onPress={handleReset} text={"Resetuj"} />
                )
              ) : (
                <ActiveButton
                  onPress={() =>
                    navigation.navigate("QuizeQuestion", {
                      documentId: documentId,
                    })
                  }
                  text={"Rozpocznij"}
                />
              )}
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default QuizeStartPage;
