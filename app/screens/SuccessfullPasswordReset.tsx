import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import H1Text from "../components/H1Text";
import Animation from "../components/Animation";
import InfoCard from "../components/InfoCard";
import Dots from "../components/Dots";
import SecondaryButton from "../components/SecondaryButton";
import ActiveButton from "../components/ActiveButton";
import { useAuth } from "../context/AuthContext";

const animationSource = require("../../assets/congratulations.json");
interface RouteParams {
  email: string;
  password: string;
}

const SuccessfullPasswordReset = ({
  route,
}: {
  route: { params: RouteParams };
}) => {
  const { email, password } = route.params;
  const logo = require("../../assets/logo.png");
  const { onLogin } = useAuth();

  const login = async () => {
    const result = await onLogin!(email, password);
    if (result && result.error) {
      alert(result.msg);
    }
  };
  return (
    <SafeAreaView className="flex-1 items-center bg-primary pb-6">
      <View className="flex-1 flex justify-around items-center mt-6 ">
        <Image source={logo} className="w-64 h-12" />
        <View className="flex-row justify-center">
          <Animation source={animationSource} />
        </View>
        <InfoCard welcomeScreen={true}>
          <Text className="leading-5 text-base text-secondary px-4">
            <Text className="font-bold text-primary">
              Twoje hasło zostało pomyślnie zresetowane!{" "}
            </Text>{" "}
            {"\n"} {"\n"}
          </Text>
        </InfoCard>
        <View className="flex-row mt-10 px-2 justify-center items-center">
          <ActiveButton onPress={login} text={"Zaloguj się"} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SuccessfullPasswordReset;

const styles = StyleSheet.create({});
