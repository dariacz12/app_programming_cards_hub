import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Animation from "../components/Animation";
import Dots from "../components/Dots";
import { LinearGradient } from "expo-linear-gradient";
import InfoCard from "../components/InfoCard";
import H1Text from "../components/H1Text";
import ActiveButton from "../components/ActiveButton";
import SecondaryButton from "../components/SecondaryButton";
import { useNavigation } from "@react-navigation/native";

const animationSource = require("../../assets/welcomeAnimation.json");

const WelcomeScreen = () => {
  const navigation = useNavigation<any>();
  return (
    <SafeAreaView className="flex-1 items-center bg-primary">
      <View className="flex-1 flex justify-around my-10">
        <H1Text text={"Cześć!"} />
        <View className="flex-row justify-center mt-10">
          <Animation source={animationSource} />
        </View>
        <InfoCard welcomeScreen={false}>
          <Text className="leading-5 text-base text-secondary px-4">
            Otwórz drzwi do świata programowania!{"\n"}
            {"\n"}
            <Text className="font-bold text-primary">Zarejestruj się</Text> i
            rozpocznij swoją przygodę z nauką języków programowania.{"\n"}
            <Text className="font-bold text-primary">Zaloguj się </Text>, jeśli
            masz już konto i kontynuuj naukę.{"\n"}
            {"\n"}
            Python, Java, JavaScript, C++ i wiele innych języków czeka na
            Ciebie!
          </Text>
        </InfoCard>
        <Dots activeIndex={0} />
        <View className="flex-row px-2 justify-around items-center">
          <SecondaryButton
            onPress={() => navigation.navigate("PrivacyPolicy")}
            text={"Zarejestruj się"}
          />
          <ActiveButton
            onPress={() => navigation.navigate("Login")}
            text={"Zaloguj się"}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({});
