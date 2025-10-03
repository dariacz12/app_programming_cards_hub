import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import ActiveButton from "../components/ActiveButton";
import InfoCard from "../components/InfoCard";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import { FormData } from "../types/FormData";

const minLength = 8;

const Login = () => {
  const navigation = useNavigation<any>();
  const [hasKeyboard, setHasKeyboard] = useState(false);
  const [noEmail, setNoEmail] = useState<boolean>(false);
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

  const logo = require("../../assets/logo.png");
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin } = useAuth();

  const login = async ({ email, password }: FormData) => {
    try {
      const result = await onLogin!(email, password);
      return result;
    } catch (e) {
      setNoEmail(true);
      return { error: true, msg: (e as any).response.error.message };
    }
    // if (result && result.error) {

    //   // alert(result.error.message);
    // }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      // behavior="padding"
      // keyboardVerticalOffset={Platform.OS === 'ios' ? 200 : 0}

      className="flex-1 flex items-center bg-primary py-10"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {/* <SafeAreaView className="flex-1 items-center bg-primary"> */}
        <View
          testID="screenBackground"
          className="flex-1 flex justify-start items-center py-12 "
        >
          <Image source={logo} className="w-64 h-12" />

          <View
            className={`flex-row justify-center ${!hasKeyboard ? "py-10" : errors.password || errors.email ? "py-0" : "py-1"}  `}
          >
            <InfoCard welcomeScreen={false}>
              <View className="mb-5">
                <Text className="leading-5 px-5 text-sm text-secondary mb-2 ">
                  Email
                </Text>
                <View className="items-center">
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <View testID="inputEmail">
                        <TextInput
                          className={`bg-primary rounded-2xl h-12 w-80 px-5 text-primary ${errors.email && "border border-redError"}`}
                          onBlur={onBlur}
                          onChangeText={(value) => onChange(value)}
                          value={value}
                        />
                      </View>
                    )}
                    name="email"
                    rules={{
                      required: "Pole wymagane",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Podaj poprawny format email",
                      },
                    }}
                  />
                </View>
                {errors.email && (
                  <Text className="text-red-600 pt-2 pl-5">
                    {errors.email.message}
                  </Text>
                )}
              </View>
              <View>
                <Text className="leading-5 px-5 text-sm text-secondary mb-2">
                  Hasło
                </Text>
                <View className="items-center justify-center flex flex-row relative">
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <View testID="inputPassword">
                        <TextInput
                          className={`bg-primary rounded-2xl h-12 w-80  px-5 text-primary ${errors.password && "border border-redError"} ${value.length >= minLength && "border border-greanColor"}`}
                          onBlur={onBlur}
                          onChangeText={(value) => onChange(value)}
                          value={value}
                          secureTextEntry={showPasword}
                        />
                      </View>
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

              <TouchableOpacity
                onPress={() => navigation.navigate("ForgotPassword")}
                className="mt-5 items-end"
              >
                <Text className="leading-5 px-5 text-sm text-secondary  ">
                  Zapomniałeś/aś hasło?
                </Text>
              </TouchableOpacity>
              {noEmail && (
                <Text className="text-red-600 pt-2 pl-5">
                  Podany e-mail i/lub hasło są błędne
                </Text>
              )}
            </InfoCard>
          </View>
          <View>
            <View testID="loginButton"></View>
            <ActiveButton text="Zaloguj się" onPress={handleSubmit(login)} />
          </View>
        </View>
        {/* </SafeAreaView>  */}
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({});
