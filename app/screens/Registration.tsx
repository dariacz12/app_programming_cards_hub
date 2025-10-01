import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  LayoutAnimation,
  NativeSyntheticEvent,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
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

type FormData = {
  name: string;
  email: string;
  password: string;
};

const minLength = 8;
const Registration = () => {
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
      name: "",
      email: "",
      password: "",
    },
  });
  const { onRegister } = useAuth();

  const registerUser = async ({ name, email, password }: FormData) => {
    const result = await onRegister!(name, email, password);
    if (result && result.error) {
      alert(result.msg);
    } else {
      navigation.navigate("SuccesfullLoginRegistration", {
        email: email,
        password: password,
      });
    }
  };

  const onChange = (arg: NativeSyntheticEvent<TextInputChangeEventData>) => {
    return {
      value: arg.nativeEvent.text,
    };
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 flex items-center bg-primary py-10"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View  testID="screenBackground" className="flex-1 flex justify-start items-center py-12 ">
          <Image source={logo} className="w-64 h-12" />

          <View
            className={`flex-row justify-center ${!hasKeyboard ? "py-10" : errors.password || errors.email ? "py-0" : "py-3"}  `}
          >
            <InfoCard  welcomeScreen={false}>
              <View   className="mb-5">
                <Text className="leading-5 px-5 text-sm text-secondary mb-2 ">
                  Imię
                </Text>
                <View className="items-center">
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <View testID="inputName">
                      <TextInput
                        className={`bg-primary rounded-2xl h-12 w-80 px-5 text-primary ${errors.name && "border border-redError"}`}
                        onBlur={onBlur}
                        onChangeText={(value) => onChange(value)}
                        value={value}
                       
                      />
                      </View>
                    )}
                    name="name"
                    rules={{
                      required: "Pole wymagane",
                      pattern: {
                        value: /^[A-Za-z]+$/i,
                        message: "Podaj poprawny format imenia",
                      },
                    }}
                  />
                </View>
                {errors.name && (
                  <Text className="text-red-600 pt-2 pl-5">
                    {errors.name.message}
                  </Text>
                )}
              </View>
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
            </InfoCard>
          </View>
            <View testID="createAccountButton">
            <ActiveButton
              text="Załóż konto"
              onPress={handleSubmit(registerUser)}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Registration;

const styles = StyleSheet.create({});
