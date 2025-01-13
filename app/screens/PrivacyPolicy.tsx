import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import H1Text from "../components/H1Text";
import Animation from "../components/Animation";
import InfoCard from "../components/InfoCard";
import Dots from "../components/Dots";
import ActiveButton from "../components/ActiveButton";
import { useNavigation } from "@react-navigation/native";
import ArrowBack from "../components/ArrowBack";

const animationSource = require("../../assets/handshake.json");

const PrivacyPolicy = () => {
  const navigation = useNavigation<any>();
  return (
    <SafeAreaView className="flex-1 items-center bg-primary">
      <View className="flex-1 flex justify-around my-10">
        <H1Text text={"Polityka prywatności"} />
        <View className="flex-row justify-center mt-10">
          <Animation source={animationSource} />
        </View>
        <InfoCard welcomeScreen={false}>
          <ScrollView
            className="grow-0"
            indicatorStyle={"white"}
            scrollIndicatorInsets={{ top: 0, left: 0, bottom: 0, right: 3 }}
          >
            <Text className="leading-5 px-4 text-base text-secondary">
              Dbamy o prywatność i bezpieczeństwo Twoich danych osobowych. W tej
              polityce wyjaśniamy, jakie dane gromadzimy, w jaki sposób je
              wykorzystujemy i chronimy.{"\n"}
              <Text className="font-bold text-primary">Dane osobowe</Text>
              {"\n"}
              Gromadzimy dane osobowe, takie jak imię i nazwisko, adres e-mail.
              Dane o użytkowaniu aplikacji Gromadzimy również dane o tym, jak
              korzystasz z aplikacji, takie jak: czas spędzony w aplikacji,typ
              urządzenia, system operacyjny Ochrona danych Stosujemy odpowiednie
              środki techniczne i organizacyjne, aby chronić Twoje dane osobowe
              przed nieuprawnionym dostępem, wykorzystaniem, ujawnieniem, zmianą
              lub zniszczeniem.
            </Text>
          </ScrollView>
        </InfoCard>
        <Dots activeIndex={1} />
        <View className="flex-row px-2 justify-around items-center">
          <ArrowBack onPress={() => navigation.navigate("WelcomeScreen")} />
          <ActiveButton
            onPress={() => navigation.navigate("Statute")}
            text={"Zgadzam się"}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({});
