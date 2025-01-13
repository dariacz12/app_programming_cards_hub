import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import ActiveButton from "../components/ActiveButton";
import InfoCard from "../components/InfoCard";
import { useNavigation } from "@react-navigation/native";
import H2Text from "../components/H2Text";
import { resetPassword } from "../actions/resetPassword";

const minLength = 8;

const ForgotPassword = () => {
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
  } = useForm<{ email: string }>({
    defaultValues: {
      email: "",
    },
  });
  const [noEmail, setNoEmail] = useState<boolean>(false);
  const [email, setEmail] = useState("");

  const resetuserPassword = async ({ email }: { email: string }) => {
    try {
      const result = await resetPassword(email);
      return result;
    } catch (e) {
      setNoEmail(true);
      return { error: true, msg: (e as any).response.data.msg };
    } // dodać przekierowanie na stronę
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 flex items-center bg-primary py-10"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 flex justify-start items-center py-12 ">
          <Image source={logo} className="w-64 h-12" />
          <View
            className={`mx-4 mt-5 items-center ${hasKeyboard ? "py-0" : errors.email ? "py-0" : "py-3"}`}
          >
            <H2Text textCenter={true} text={"Zresetuj hasło"} />
            <Text className="leading-5 px-4 mt-1 text-base text-secondary text-center">
              Wpisz adres e-mail, którego użyłeś do rejestracji w aplikacji,
              wyślemy tam wiadomość z linkiem do resetowania hasła{" "}
            </Text>
          </View>
          <View className={`flex-row justify-center`}>
            <InfoCard welcomeScreen={false}>
              <View className="mb-5">
                <Text className="leading-5 px-5 text-sm text-secondary mb-2 ">
                  Email
                </Text>
                <View className="items-center">
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        className={`bg-primary rounded-2xl h-12 w-80 px-5 text-primary ${errors.email && "border border-redError"}`}
                        onBlur={onBlur}
                        onChangeText={(value) => onChange(value)}
                        value={value}
                      />
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
                {noEmail && (
                  <Text className="text-red-600 pt-2 pl-5">
                    Nie odnaleziono konta powiązanego z podanym adresem e-mail.
                  </Text>
                )}
              </View>
            </InfoCard>
          </View>
          <View>
            <ActiveButton
              text="Resetuj hasło"
              onPress={handleSubmit(resetuserPassword)}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({});
