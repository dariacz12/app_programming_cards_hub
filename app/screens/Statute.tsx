import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import H1Text from "../components/H1Text";
import Animation from "../components/Animation";
import InfoCard from "../components/InfoCard";
import Dots from "../components/Dots";
import SecondaryButton from "../components/SecondaryButton";
import ActiveButton from "../components/ActiveButton";
import { useNavigation } from "@react-navigation/native";
import ArrowBack from "../components/ArrowBack";

const animationSource = require("../../assets/statute.json");

const Statute = () => {
  const navigation = useNavigation<any>();
  return (
    <SafeAreaView className="flex-1 items-center bg-primary">
      <View className="flex-1 flex justify-around my-10">
        <H1Text text={"Regulamin"} />
        <View className="flex-row justify-center mt-10">
          <Animation source={animationSource} />
        </View>
        <InfoCard>
          <ScrollView
            className="grow-0"
            indicatorStyle={"white"}
            scrollIndicatorInsets={{ top: 0, left: 0, bottom: 0, right: 3 }}
          >
            <Text className="leading-5 text-base text-secondary px-4 ">
              <Text className="font-bold text-primary">
                1. Postanowienia ogólne
              </Text>
              {"\n"}
              1.1. Niniejszy regulamin określa zasady korzystania z aplikacji
              mobilnej [nazwa aplikacji] (dalej jako „Aplikacja”). {"\n"}
              1.2. Aplikacja jest udostępniana przez [nazwa firmy] (dalej jako
              „Usługodawca”). {"\n"}
              1.3. Korzystanie z Aplikacji oznacza akceptację niniejszego
              regulaminu.{"\n"}
              2. Zasady korzystania z Aplikacji{"\n"}
              2.1. Aplikacja jest udostępniana Użytkownikom bezpłatnie.{"\n"}
              2.2. Użytkownik zobowiązany jest do korzystania z Aplikacji w
              sposób zgodny z prawem i regulaminem. {"\n"}
              2.3. Zabronione jest wykorzystywanie Aplikacji do celów
              niezgodnych z prawem lub regulaminem.
            </Text>
          </ScrollView>
        </InfoCard>
        <Dots activeIndex={2} />
        <View className="flex-row px-2 justify-around items-center">
          <ArrowBack onPress={() => navigation.navigate("PrivacyPolicy")} />
          <ActiveButton
            onPress={() => navigation.navigate("Login")}
            text={"Zgadzam się"}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Statute;

const styles = StyleSheet.create({});
