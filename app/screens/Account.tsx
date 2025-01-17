import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  NativeSyntheticEvent,
  Platform,
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
import { useAuth } from "../context/AuthContext";
import Line from "../components/Line";
import SecondaryButton from "../components/SecondaryButton";
import Avatar from "../components/Avatar";
import EditPen from "../components/EditPen";
import ModalPopup from "../components/ModalPopup";
import { LinearGradient } from "expo-linear-gradient";
import * as Notifications from "expo-notifications";
import { format } from "date-fns";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import axios from "axios";
import { API_URL } from "../context/AuthContext";
import useCurrentUser from "../hooks/api/useCurrentUser";
import { changePassword } from "../actions/changePassword";
import { FormNameData } from "../types/FormNameData";
import { FormPasswordData } from "../types/FormPasswordData";
import * as ImagePicker from "expo-image-picker";
import useUpdateUserPhoto from "../hooks/api/useUpdateUserPhoto";
import { uploadPhoto } from "../actions/uploadPhoto";
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
  const fetchScheduledNotifications = async () => {
    try {
      const notifications =
        await Notifications.getAllScheduledNotificationsAsync();
      setScheduledNotifications(notifications);
    } catch (error) {
      console.error("Error fetching scheduled notifications:", error);
    }
  };

  useEffect(() => {
    fetchScheduledNotifications();
  }, []);

  function getRandomElement(arr: string[]) {
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
        type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
        hour: time.getHours(),
        minute: time.getMinutes(),
        repeats: true,
      },
    });
    fetchScheduledNotifications();
  };
  const cancelNotification = async (cancelId: string) => {
    if (cancelId) {
      await Notifications.cancelScheduledNotificationAsync(cancelId);
      fetchScheduledNotifications();
    } else {
      console.log("No notification to cancel.");
    }
  };
  const handleTimeChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined,
  ) => {
    const currentTime = selectedDate || chosenTime;
    setChosenTime(currentTime);
  };

  const [showCurrentPasword, setShowcurrentPin] = useState<boolean>(true);
  const [showNewPasword, setShowNewPassword] = useState<boolean>(true);
  const [showNewPaswordRepeat, setShowNewPasswordRepeat] =
    useState<boolean>(true);
  const togglecurrentPin = () => {
    setShowcurrentPin(!showCurrentPasword);
  };
  const toggleNewPassword = () => {
    setShowNewPassword(!showNewPasword);
  };
  const toggleNewPasswordRepeat = () => {
    setShowNewPasswordRepeat(!showNewPaswordRepeat);
  };

  const logo = require("../../assets/logo.png");
  const {
    register: registerForm1,
    handleSubmit: handleSubmitForm1,
    control: controlForm1,
    formState: { errors: errorsForm1 },
  } = useForm<FormNameData>({
    defaultValues: {
      name: "",
    },
  });

  const {
    register: registerForm2,
    handleSubmit: handleSubmitForm2,
    control: controlForm2,
    formState: { errors: errorsForm2 },
    reset,
  } = useForm<FormPasswordData>({
    defaultValues: {
      currentPin: "",
      newPassword: "",
      repeatNewPassword: "",
    },
  });

  const onSubmitForm1 = (data: FormNameData) => {
    console.log("Form 1 Data:", data);
  };

  const onSubmitForm2 = async (data: FormPasswordData) => {
    try {
      const result = await changePassword(
        data.currentPin,
        data.newPassword,
        data.repeatNewPassword,
      );
      if (result) {
        Alert.alert("", "Hasło zostało pomyślnie zmienione.", [{ text: "OK" }]);
        reset();
      }
      return result;
    } catch (e) {
      return {
        error: true,
        msg: (e as any).response?.error?.message || "An unknown error occurred",
      };
    }
  };

  const { onLogout } = useAuth();

  const logoutUser = async () => {
    const result = await onLogout!();
    if (result && result.error) {
      alert(result.msg);
    }
  };

  const deleteUser = async (id: number) => {
    try {
      const result = await axios.delete(`${API_URL}/users/${id}`);
      onLogout!();
      return result;
    } catch (e) {
      return {
        error: true,
        msg: (e as any).response?.error?.message || "An unknown error occurred",
      };
    }
  };
  const {
    data: userData,
    loading: loadingUser,
    error: errorUser,
  } = useCurrentUser();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalUploadPhotoVisible, setModalUploadPhotoVisible] = useState(false);

  const [image, setImage] = useState<string | null>(null);
  console.log("zdjęcie", image);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const [newPhotoUrl, setNewPhotoUrl] = useState<string>();

  const assignPhotoToUser = async () => {
    if (!image) {
      console.warn("No image selected");
      return;
    }

    try {
      const result = await uploadPhoto(image, userData?.username);
      console.log("Image uploaded successfully:", result[0].url);
      setNewPhotoUrl(result[0].url);
    } catch (error) {
      console.error("Error assigning photo:", error);
    }
  };
  const {
    data: photoData,
    loading: loadingPhoto,
    error: errorPhoto,
  } = useUpdateUserPhoto(newPhotoUrl);

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
              <Avatar homeScreen={false} avatar={userData?.avatar?.url} />
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
                    <TouchableOpacity onPress={pickImage}>
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
                    </TouchableOpacity>
                    <View className="flex flex-row justify-center">
                      <ActiveButton
                        onPress={assignPhotoToUser}
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
                      control={controlForm1}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                          placeholder={userData?.username}
                          placeholderTextColor="#B6B4CA"
                          className={`bg-primary rounded-2xl h-12 w-80 px-5 text-primary ${errorsForm1.name && "border border-redError"}`}
                          onBlur={onBlur}
                          onChangeText={(value) => onChange(value)}
                          value={value}
                        />
                      )}
                      name="name"
                      rules={{
                        required: "Pole wymagane",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Podaj poprawny format email",
                        },
                      }}
                    />
                  </View>
                  {errorsForm1.name && (
                    <Text className="text-red-600 pt-2 pl-5">
                      {errorsForm1.name.message}
                    </Text>
                  )}
                </View>
              </InfoCard>
            </View>
            <View className="mb-6">
              <ActiveButton
                text="Zapisz zmiany"
                onPress={handleSubmitForm1(onSubmitForm1)}
              />
            </View>
            <Text className="text-white font-bold text-lg mr-48">
              Bezpieczeństwo
            </Text>
            <View className={`flex-row justify-center mb-3`}>
              <InfoCard welcomeScreen={false}>
                <View className="mb-4">
                  <Text className="leading-5 px-5 text-sm text-secondary mb-2 ">
                    Email
                  </Text>
                  <View className="items-center">
                    <TextInput
                      placeholder={userData?.email}
                      placeholderTextColor="#B6B4CA"
                      className={`bg-primary rounded-2xl h-12 w-80 px-5 text-primary`}
                      editable={false}
                    />
                  </View>
                </View>
                <View>
                  <Text className="leading-5 px-5 text-sm text-secondary mb-2">
                    Obecne hasło
                  </Text>
                  <View className="items-center justify-center flex flex-row relative">
                    <Controller
                      control={controlForm2}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                          className={`bg-primary rounded-2xl h-12 w-80  px-5 text-primary ${errorsForm2.currentPin && "border border-redError"} ${value.length >= minLength && "border border-greanColor"}`}
                          onBlur={onBlur}
                          onChangeText={(value) => onChange(value)}
                          value={value}
                          secureTextEntry={showCurrentPasword}
                          textContentType="username"
                          autoComplete="off"
                        />
                      )}
                      name="currentPin"
                      rules={{
                        required: "Pole wymagane",
                        minLength: {
                          value: 8,
                          message: "Min 8 znaków",
                        },
                      }}
                    />
                    <TouchableOpacity
                      onPress={togglecurrentPin}
                      className="absolute right-8"
                    >
                      {showCurrentPasword ? (
                        <Entypo name="eye" size={22} color="white" />
                      ) : (
                        <Entypo name="eye-with-line" size={22} color="white" />
                      )}
                    </TouchableOpacity>
                  </View>
                  {errorsForm2.currentPin && (
                    <Text className="text-red-600 pt-2 pl-5">
                      {errorsForm2.currentPin.message}
                    </Text>
                  )}
                </View>
                <View className="mt-4">
                  <Text className="leading-5 px-5 text-sm text-secondary mb-2">
                    Nowe hasło
                  </Text>
                  <View className="items-center justify-center flex flex-row relative">
                    <Controller
                      control={controlForm2}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                          className={`bg-primary rounded-2xl h-12 w-80  px-5 text-primary ${errorsForm2.newPassword && "border border-redError"} ${value.length >= minLength && "border border-greanColor"}`}
                          onBlur={onBlur}
                          onChangeText={(value) => onChange(value)}
                          value={value}
                          secureTextEntry={showNewPasword}
                          textContentType="username"
                          autoComplete="off"
                        />
                      )}
                      name="newPassword"
                      rules={{
                        required: "Pole wymagane",
                        minLength: {
                          value: 8,
                          message: "Min 8 znaków",
                        },
                      }}
                    />
                    <TouchableOpacity
                      onPress={toggleNewPassword}
                      className="absolute right-8"
                    >
                      {showNewPasword ? (
                        <Entypo name="eye" size={22} color="white" />
                      ) : (
                        <Entypo name="eye-with-line" size={22} color="white" />
                      )}
                    </TouchableOpacity>
                  </View>
                  {errorsForm2.newPassword && (
                    <Text className="text-red-600 pt-2 pl-5">
                      {errorsForm2.newPassword.message}
                    </Text>
                  )}
                </View>
                <View className="mt-4">
                  <Text className="leading-5 px-5 text-sm text-secondary mb-2">
                    Powtórz nowe hasło
                  </Text>
                  <View className="items-center justify-center flex flex-row relative">
                    <Controller
                      control={controlForm2}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                          className={`bg-primary rounded-2xl h-12 w-80  px-5 text-primary ${errorsForm2.repeatNewPassword && "border border-redError"} ${value.length >= minLength && "border border-greanColor"}`}
                          onBlur={onBlur}
                          onChangeText={(value) => onChange(value)}
                          value={value}
                          secureTextEntry={showNewPaswordRepeat}
                          textContentType="username"
                          autoComplete="off"
                        />
                      )}
                      name="repeatNewPassword"
                      rules={{
                        required: "Pole wymagane",
                        minLength: {
                          value: 8,
                          message: "Min 8 znaków",
                        },
                      }}
                    />
                    <TouchableOpacity
                      onPress={toggleNewPasswordRepeat}
                      className="absolute right-8"
                    >
                      {showNewPaswordRepeat ? (
                        <Entypo name="eye" size={22} color="white" />
                      ) : (
                        <Entypo name="eye-with-line" size={22} color="white" />
                      )}
                    </TouchableOpacity>
                  </View>
                  {errorsForm2.repeatNewPassword && (
                    <Text className="text-red-600 pt-2 pl-5">
                      {errorsForm2.repeatNewPassword.message}
                    </Text>
                  )}
                </View>
              </InfoCard>
            </View>
            <View>
              <ActiveButton
                text="Zapisz zmiany"
                onPress={handleSubmitForm2(onSubmitForm2)}
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
                      {userData && (
                        <ActiveButton
                          onPress={() => deleteUser(userData.id)}
                          text={"Usuń"}
                        ></ActiveButton>
                      )}
                    </View>
                  </LinearGradient>
                </TouchableWithoutFeedback>
              </View>
            </ModalPopup>
            <View className="flex-row flex-1 flex justify-between w-full px-6">
              <SecondaryButton
                onPress={() => setModalVisible(!modalVisible)}
                text={"Usuń konto"}
              />
              <SecondaryButton onPress={logoutUser} text={"Wyloguj się"} />
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
