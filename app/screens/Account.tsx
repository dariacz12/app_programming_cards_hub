import {
  Alert,
  Button,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  LayoutAnimation,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
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
import { AntDesign, Entypo, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import Line from "../components/Line";
import SecondaryButton from "../components/SecondaryButton";
import Avatar from "../components/Avatar";
import EditPen from "../components/EditPen";
import ModalPopup from "../components/ModalPopup";
import { LinearGradient } from "expo-linear-gradient";
import * as Notifications from "expo-notifications";
import { format } from "date-fns";
import DateTimePicker from "@react-native-community/datetimepicker";

type FormData = {
  name: string;
  email: string;
  password: string;
};

const minLength = 8;
const notificationsList = [
  "Czas na codzienną dawkę nauki programowania!",
  "Pamiętaj, aby dzisiaj poćwiczyć programowanie!",
  "Nie zapomnij o nauce – każdy dzień to krok do przodu!",
  "Zrób kolejny krok w kierunku mistrzostwa w programowaniu!",
  "Twój cel jest blisko, poświęć chwilę na naukę kodowania!",
  "Wpadnij na krótką sesję programowania, sukces jest w zasięgu ręki!",
  "Regularna praktyka to klucz – zaplanuj czas na programowanie!",
  "Rozwój umiejętności nie czeka – czas na naukę programowania!",
];
const Account = () => {
  const [chosenTime, setChosenTime] = useState<Date>();
  const [show, setShow] = useState(false);
  const [scheduledNotifications, setScheduledNotifications] = useState<
    Array<Notifications.NotificationRequest>
  >([]);
  console.log("11111", scheduledNotifications[0]);
  const fetchScheduledNotifications = async () => {
    try {
      const notifications =
        await Notifications.getAllScheduledNotificationsAsync();
      setScheduledNotifications(notifications);
      console.log("Scheduled Notifications:", notifications);
    } catch (error) {
      console.error("Error fetching scheduled notifications:", error);
    }
  };

  useEffect(() => {
    fetchScheduledNotifications();
  }, []);

  function getRandomElement(arr: any) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  }

  const scheduleNotification = async (time: Date) => {
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Programming Cards' Hub",
        body: `${getRandomElement(notificationsList)}`,
        sound: true,
      },
      trigger: {
        hour: time.getHours(),
        minute: time.getMinutes(),
        repeats: true,
      },
    });
    fetchScheduledNotifications();
  };
  const cancelNotification = async (cancelId: any) => {
    if (cancelId) {
      await Notifications.cancelScheduledNotificationAsync(cancelId);
      console.log("Notification canceled:", cancelId);
      fetchScheduledNotifications();
    } else {
      console.log("No notification to cancel.");
    }
  };
  const handleTimeChange = (event: any, selectedDate: Date | undefined) => {
    const currentTime = selectedDate || chosenTime;
    setChosenTime(currentTime);
  };

  const navigation = useNavigation<any>();

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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin } = useAuth();

  const login = async () => {
    const result = await onLogin!(email, password);
    if (result && result.error) {
      alert(result.msg);
    }
  };
  const [modalVisible, setModalVisible] = useState(false);
  const [modalUploadPhotoVisible, setModalUploadPhotoVisible] = useState(false);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 flex items-center bg-primary py-10"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <View className="flex-1 flex items-center justify-start pt-12 pb-36 ">
            <Image source={logo} className="w-64 h-12" />
            <View className="mt-6 relative">
              <Avatar homeScreen={false} />
              <TouchableOpacity
                className="absolute left-20 top-20"
                onPress={() => setModalUploadPhotoVisible(true)}
              >
                <EditPen />
              </TouchableOpacity>
            </View>
            <ModalPopup
              modalVisible={modalUploadPhotoVisible}
              setModalVisible={setModalUploadPhotoVisible}
              hideModal={() => setModalUploadPhotoVisible(false)}
            >
              <View style={styles.centeredView}>
                <TouchableWithoutFeedback
                  onPress={() => setModalUploadPhotoVisible(true)}
                >
                  <LinearGradient
                    style={styles.modalView}
                    className="border border-lightborderColor items-center"
                    colors={["rgba(82,78,155,255)", "rgba(54,52,133,255)"]}
                  >
                    <Text className="text-white font-bold text-base mr-48 mb-6">
                      Prześlij zdjęcie
                    </Text>
                    <View className="flex w-64 py-7 mb-6 justify-center items-center border-dashed border-2 border-whiteColor rounded-xl">
                      <Feather name="upload" size={36} color="white" />
                      <Text
                        style={styles.modalText}
                        className="text-whiteColor mt-4"
                      >
                        <Text className="text-activeColor font-bold">
                          Wybierz
                        </Text>{" "}
                        zdjęcie
                      </Text>
                      <Text
                        style={styles.modalText}
                        className="text-whiteColor"
                      >
                        Dozwolone formaty: {"\n"} zip, image, pdf lub ms.word
                      </Text>
                    </View>
                    <View className="flex flex-row justify-center">
                      <ActiveButton
                        onPress={() =>
                          setModalUploadPhotoVisible(!modalUploadPhotoVisible)
                        }
                        text={"Prześlij"}
                      ></ActiveButton>
                    </View>
                  </LinearGradient>
                </TouchableWithoutFeedback>
              </View>
            </ModalPopup>
            <Text className="text-white font-bold text-lg mr-28 ml-6 mt-7">
              Twoje przypomnienia o nauce
            </Text>

            <View className="flex-1 flex-row flex-wrap items-start justify-around mb-4 mx-8 mt-2 w-hull ">
              {scheduledNotifications &&
                scheduledNotifications.map(
                  ({
                    trigger,
                    identifier,
                  }: {
                    trigger: any;
                    identifier: string;
                  }) => (
                    <View key={identifier} className="flex relative">
                      <View
                        className={
                          "bg-block flex h-16 w-16 m-2 items-center justify-center   border border-borderColorSemiTransparent rounded-3xl"
                        }
                      >
                        <Text className="text-whiteColor text-sm space-y-2">
                          {`${trigger.dateComponents.hour}:${String(trigger.dateComponents.minute).padStart(2, "0")}`}
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => cancelNotification(identifier)}
                        className="absolute right-2 top-0.5 "
                      >
                        <View className=" bg-semi-transparent flex p-1 items-center justify-center   border border-borderColorSemiTransparent rounded-3xl">
                          <AntDesign name="close" size={12} color={"white"} />
                        </View>
                      </TouchableOpacity>
                    </View>
                  ),
                )}
            </View>

            {!show && (
              <View className="flex-1 flex items-center  justify-center w-full ">
                <SecondaryButton
                  onPress={() => setShow(!show)}
                  text={"Ustaw godzinę"}
                />
              </View>
            )}

            {show && (
              <>
                <View className="mb-2">
                  <DateTimePicker
                    value={chosenTime || new Date()}
                    mode="time"
                    textColor="white"
                    display="spinner"
                    onChange={handleTimeChange}
                  />
                </View>

                <View className="flex justify-center mb-2 items-center">
                  <SecondaryButton
                    onPress={() => {
                      if (chosenTime) {
                        scheduleNotification(chosenTime);

                        Alert.alert(
                          "",
                          `Codziennie o godzinie ${format(chosenTime, "HH:mm")} będziesz otrzymywać przypomnienie o nauce.`,
                          [{ text: "OK" }],
                        );
                        setShow(false);
                      } else {
                        alert(
                          "Wybierz godzinę o której chcesz otrzymać przypomnienie.",
                        );
                      }
                    }}
                    text={"Dodaj"}
                  />
                </View>
              </>
            )}

            <Text className="text-white font-bold text-lg mr-48 mt-6">
              Dane personalne
            </Text>
            <View className={`flex-row justify-center mb-2`}>
              <InfoCard welcomeScreen={false}>
                <View className="mb-1">
                  <Text className="leading-5 px-5 text-sm text-secondary mb-2 ">
                    Imię
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
                </View>
              </InfoCard>
            </View>
            <Text className="text-white font-bold text-lg mr-48">
              Bezpieczeństwo
            </Text>
            <View className={`flex-row justify-center mb-3`}>
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
                </View>
                <View>
                  <Text className="leading-5 px-5 text-sm text-secondary mb-2">
                    Hasło
                  </Text>
                  <View className="items-center justify-center flex flex-row relative">
                    <Controller
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                          className={`bg-primary rounded-2xl h-12 w-80  px-5 text-primary ${errors.password && "border border-redError"} ${value.length >= minLength && "border border-greanColor"}`}
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
              </InfoCard>
            </View>
            <View>
              <ActiveButton
                text="Zapisz zmiany"
                onPress={handleSubmit(login)}
              />
            </View>
            <View className="w-96 items-center justify-center">
              <Line />
            </View>
            <ModalPopup
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              hideModal={() => setModalVisible(false)}
            >
              <View style={styles.centeredView}>
                <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
                  <LinearGradient
                    style={styles.modalView}
                    className="border border-lightborderColor"
                    colors={["rgba(82,78,155,255)", "rgba(54,52,133,255)"]}
                  >
                    <Text style={styles.modalText} className="text-whiteColor">
                      Czy jesteś pewien, że chcesz usunąć konto?
                    </Text>
                    <View className="flex flex-row">
                      <TouchableOpacity
                        onPress={() => setModalVisible(!modalVisible)}
                        className="items-center w-40 p-3 rounded-2xl  bg-light-semi-transparentborder border border-lightborderColor"
                      >
                        <Text className="text-base  text-primary">Cofnij</Text>
                      </TouchableOpacity>
                      <View className="w-2"></View>
                      <ActiveButton
                        onPress={() => setModalVisible(!modalVisible)}
                        text={"Usuń"}
                      ></ActiveButton>
                    </View>
                  </LinearGradient>
                </TouchableWithoutFeedback>
              </View>
            </ModalPopup>
            <View className="flex-row flex-1 flex justify-between w-full px-6">
              <SecondaryButton
                onPress={() => setModalVisible(true)}
                text={"Usuń konto"}
              />
              <SecondaryButton
                onPress={() => navigation.navigate("PrivacyPolicy")}
                text={"Wyloguj się"}
              />
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Account;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    borderRadius: 30,
    paddingVertical: 35,
    paddingHorizontal: 15,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  textSecondary: {
    color: '"#B6B4CA"',
  },
});
