import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  LayoutAnimation,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import ActiveButton from "../components/ActiveButton";
import InfoCard from "../components/InfoCard";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import H2Text from "../components/H2Text";
import axios from "axios";

export const API_URL = "";
type FormData = {
  password_repeat: string;
  password: string;
};

const minLength = 8;

const NewPassword = () => {
  const navigation = useNavigation<any>();
  const [hasKeyboard, setHasKeyboard] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setHasKeyboard(true);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); // Animate padding change
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setHasKeyboard(false);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); // Animate padding change
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const [showPasword, setShowPassword] = useState<boolean>(true);
  const togglePassword = () => {
    setShowPassword(!showPasword);
  };
  const [showRepeatPasword, setShowReapeatPassword] = useState<boolean>(true);
  const toggleReapeatPassword = () => {
    setShowReapeatPassword(!showRepeatPasword);
  };
  const logo = require("../../assets/logo.png");
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      password_repeat: "",
      password: "",
    },
  });
  // const [password_repeat, setPassword_repeat] = useState("");
  // const [password, setPassword] = useState<any>("");
  const password = useRef({});
  password.current = watch("password", "");
  const createNewPassword = async () => {};

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      // behavior="padding"
      // keyboardVerticalOffset={Platform.OS === 'ios' ? 200 : 0}

      className="flex-1 flex items-center bg-primary py-10"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {/* <SafeAreaView className="flex-1 items-center bg-primary"> */}
        <View className="flex-1 flex justify-start items-center py-12 ">
          <Image source={logo} className="w-64 h-12" />

          <View
            className={`mx-4  items-center ${hasKeyboard ? "pt-4" : errors.password || errors.password_repeat ? "pt-4" : "pt-9 pb-2"}`}
          >
            <H2Text text={"Ustaw nowe hasło"} />
          </View>
          <View className={`flex-row justify-center`}>
            <InfoCard welcomeScreen={false}>
              <View>
                <Text className="leading-5 px-5 text-sm text-secondary mb-2">
                  Nowe hasło
                </Text>
                <View className="items-center justify-center flex flex-row relative">
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        className={`bg-primary rounded-2xl h-12 w-80  px-5 text-primary ${errors.password && "border border-redError"} ${value?.length >= minLength && "border border-greanColor"}`}
                        onBlur={onBlur}
                        onChangeText={(value) => onChange(value)}
                        value={value}
                        secureTextEntry={showPasword}
                      />
                    )}
                    name="password"
                    rules={{
                      required: "Pole wymagane",
                      minLength: {
                        value: 8,
                        message: "Min 8 znaków",
                      },
                    }}
                  />
                  <TouchableOpacity
                    onPress={togglePassword}
                    className="absolute right-8"
                  >
                    {showPasword ? (
                      <Entypo name="eye" size={22} color="white" />
                    ) : (
                      <Entypo name="eye-with-line" size={22} color="white" />
                    )}
                  </TouchableOpacity>
                </View>
                {errors.password && (
                  <Text className="text-red-600 pt-2 pl-5">
                    {errors.password.message}
                  </Text>
                )}
              </View>
              <View className="pt-5">
                <Text className="leading-5 px-5 text-sm text-secondary mb-2">
                  Powtórz Hasło
                </Text>
                <View className="items-center justify-center flex flex-row relative">
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        className={`bg-primary rounded-2xl h-12 w-80  px-5 text-primary ${errors.password_repeat && "border border-redError"} ${value?.length >= minLength && "border border-greanColor"}`}
                        onBlur={onBlur}
                        onChangeText={(value) => onChange(value)}
                        value={value}
                        secureTextEntry={showRepeatPasword}
                      />
                    )}
                    name="password_repeat"
                    rules={{
                      required: "Pole wymagane",
                      validate: (value) =>
                        value === password.current || "Podane hasła różnią się",
                    }}
                  />
                  <TouchableOpacity
                    onPress={toggleReapeatPassword}
                    className="absolute right-8"
                  >
                    {showPasword ? (
                      <Entypo name="eye" size={22} color="white" />
                    ) : (
                      <Entypo name="eye-with-line" size={22} color="white" />
                    )}
                  </TouchableOpacity>
                </View>
                {errors.password_repeat && (
                  <Text className="text-red-600 pt-2 pl-5">
                    {errors.password_repeat.message}
                  </Text>
                )}
              </View>
            </InfoCard>
          </View>
          <View>
            {/* <ActiveButton text="Resetuj hasło" onPress={handleSubmit(createNewPassword)} /> */}
            <ActiveButton
              text="Zaloguj się"
              onPress={() => navigation.navigate("SuccessfullPasswordReset")}
            />
          </View>
        </View>
        {/* </SafeAreaView>  */}
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default NewPassword;

const styles = StyleSheet.create({});
