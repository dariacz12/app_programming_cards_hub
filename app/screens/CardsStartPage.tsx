import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import H1Text from "../components/H1Text";
import InfoCard from "../components/InfoCard";
import ActiveButton from "../components/ActiveButton";
import Slider from "../components/Slider";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import SecondaryButton from "../components/SecondaryButton";
import H3Text from "../components/H3Text";
import { Controller, useForm } from "react-hook-form";
import ModalPopup from "../components/ModalPopup";
import { LinearGradient } from "expo-linear-gradient";
import CategoryElement from "../components/CategoryElement";
import ProgressCircular from "../components/ProgressCircular";
import axios from "axios";
import { API_URL } from "../context/AuthContext";
type FormData = {
  kod: string;
};

const CardsStartPage = ({ route }: { route: any }) => {
  const { documentId } = route?.params;

  const cardsPhotos = [
    { id: "1", src: require("../../assets/react1.png") },
    // {id: '2',
    //  src: require('../../assets/react2.png')
    // },
    { id: "3", src: require("../../assets/react3.png") },
  ];
  const cardsCategories = [
    {
      id: "1",
      iconeCategory: require("../../assets/categorycard1.png"),
      nameCategory: "Zmienne, Operatory",
    },
    {
      id: "2",
      iconeCategory: require("../../assets/categorycard2.png"),
      nameCategory: "Tablice",
    },
    {
      id: "3",
      iconeCategory: require("../../assets/categorycard3.png"),
      nameCategory: "Funkcje",
    },
    {
      id: "4",
      iconeCategory: require("../../assets/categorycard4.png"),
      nameCategory: "Obiekty",
    },
    {
      id: "5",
      iconeCategory: require("../../assets/categorycard5.png"),
      nameCategory: "Pojęcia",
    },
    {
      id: "6",
      iconeCategory: require("../../assets/categorycard6.png"),
      nameCategory: "Silnik JavaScript",
    },
    {
      id: "7",
      iconeCategory: require("../../assets/categorycard7.png"),
      nameCategory: "REST API/HTTP",
    },
    {
      id: "8",
      iconeCategory: require("../../assets/categorycard8.png"),
      nameCategory: "Eventy",
    },
  ];
  const scrollView = useRef<ScrollView>(null);
  const navigation = useNavigation<any>();
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      kod: "",
    },
  });
  const [modalVisible, setModalVisible] = useState(false);
  const openExternalLink = async () => {
    const url = "https://fiszki-z-programowania.pl/";
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      Linking.openURL(url);
    } else {
      Alert.alert(`Can't open this URL: ${url}`);
    }
  };

  const [cardData, setCardData] = useState<any>();
  console.log("cardData", cardData);

  useEffect(() => {
    const getCardData = async () => {
      try {
        const data = await axios.get(
          `${API_URL}/cards/${documentId}?populate[sliderPhotos]=*`,
        );
        setCardData(data.data.data);
      } catch (e) {
        return { error: true, msg: (e as any).response.data.msg };
      }
    };
    getCardData();
  }, [documentId]);
  return (
    <>
      {cardData && (
        <ScrollView ref={scrollView} className="bg-primary">
          <View className=" pb-[60] mb-6">
            <View className="flex relative">
              <TouchableOpacity
                className="absolute z-10 p-2 left-10 top-16"
                onPress={() =>
                  navigation.navigate("Tabbar", {
                    screen: "Home",
                  })
                }
              >
                <AntDesign name="left" size={24} color="ghostwhite" />
              </TouchableOpacity>

              <View className="mb-4 flex-1  w-full">
                <Slider photos={cardData.sliderPhotos} />
              </View>
            </View>
            <View className="bg-primary bottom-12 rounded-2xl ">
              <View className="mt-2 mx-10">
                <View className="w-full flex-1 h-full   flex-row">
                  <View className="pr-6 mt-5">
                    <TouchableOpacity
                      className=""
                      onPress={() =>
                        navigation.navigate("Tabbar", {
                          screen: "Home",
                        })
                      }
                    >
                      <ProgressCircular
                        name={cardData.name}
                        percentage={80}
                        radius={11}
                        strokeWidth={5}
                        duration={500}
                        color={cardData.circleProgressColor}
                        delay={0}
                        max={100}
                      />
                    </TouchableOpacity>
                  </View>
                  <View className="justify-center items-start ">
                    <H1Text text={cardData.name} />
                    <Text className="text-sm  text-secondary">
                      rozwiązano 65 z 100 pytań
                    </Text>
                  </View>
                </View>
              </View>
              <View className="items-start ml-6 my-8">
                <H3Text text={"Kategorie kart"} />
              </View>
              <View className="flex w-full justify-center mb-4 flex-wrap flex-row">
                {cardsCategories.map(({ iconeCategory, nameCategory }) => {
                  return (
                    <CategoryElement nameCategory={nameCategory}>
                      {iconeCategory}
                    </CategoryElement>
                  );
                })}
              </View>
              <InfoCard welcomeScreen={false}>
                <Text className="leading-5 text-base text-secondary px-4">
                  Programujesz w JavaScript? 👨‍💻 A może dopiero myślisz o pracy
                  jako Front-end developer? 🚀 Według nas niezależnie od
                  doświadczenia i stanowiska warto rozwijać swoją wiedzę, gdyż
                  to ona jest w cenie! 📖
                  {"\n"}Z naszymi kartami:
                  {"\n"}🚀 Poznasz lepiej swoje narzędzie pracy. W przypadku
                  programisty najcenniejsza jest wiedza!
                  {"\n"}🚀 Zobaczysz, jak działa JavaScript! Pojęcia typu: Call
                  Stack, Stack, Event Queue, IFEE, Closure, Event Capturing,
                  dziedziczenie prototypowe czy też mutacja danych nie będą
                  więcej Ci obce!
                  {"\n"}🚀 Przygotujesz się do technicznej części rozmowy
                  rekrutacyjnej.
                  {"\n"}🚀 Poznasz zagadnienia często pomijane w kursach i
                  tutorialach
                  {"\n"}🚀 Przetestujesz przykłady bez przepisywania kodu!
                  Wystarczy zeskanować kod QR z karty.
                </Text>
              </InfoCard>
              <View className="flex-row mt-5 px-2 mx-4 justify-around items-center">
                <SecondaryButton
                  onPress={() => navigation.navigate("")}
                  text={"Przetestuj"}
                />
                <ActiveButton onPress={openExternalLink} text={"Kup"} />
              </View>
              <View className="mx-8 my-11  bg-block h-1 rounded-lg " />
              <View className="items-start ml-6 mb-3 ">
                <H3Text text={"Uzyskaj pełny dostęp po zakupie"} />
              </View>
              <ModalPopup
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                hideModal={() => setModalVisible(false)}
              >
                <View style={styles.centeredView}>
                  <TouchableWithoutFeedback
                    onPress={() => setModalVisible(true)}
                  >
                    <LinearGradient
                      style={styles.modalView}
                      className="border border-lightborderColor"
                      colors={["rgba(82,78,155,255)", "rgba(54,52,133,255)"]}
                    >
                      <Text
                        style={styles.modalText}
                        className="text-whiteColor"
                      >
                        Po zakupie wybranych kart na naszej stronie internetowej
                        sprawdź swoją skrzynkę pocztową. Znajdziesz tam kod
                        aktywacyjny.
                      </Text>
                    </LinearGradient>
                  </TouchableWithoutFeedback>
                </View>
              </ModalPopup>
              <InfoCard welcomeScreen={false}>
                <View className="mb-1 ">
                  <View className="flex-1 flex-row">
                    <Text className="leading-5 pl-5  pb-2 text-sm text-secondary mb-2 ">
                      Wpisz kod aktywacyjny
                    </Text>
                    <TouchableOpacity
                      className="px-2"
                      onPress={() => setModalVisible(!modalVisible)}
                    >
                      <MaterialCommunityIcons
                        name="open-in-new"
                        size={18}
                        color="#B6B4CA"
                      />
                    </TouchableOpacity>
                  </View>

                  <View className="items-center">
                    <Controller
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                          className={`bg-primary rounded-2xl h-12 w-80 px-5 text-primary `}
                          onBlur={onBlur}
                          onChangeText={(value) => onChange(value)}
                          value={value}
                        />
                      )}
                      name="kod"
                      rules={{
                        required: "Pole wymagane",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Podaj poprawny poprawny kod aktywacyjny",
                        },
                      }}
                    />
                  </View>
                  {errors.kod && (
                    <Text className="text-red-600 pt-2 pl-5">
                      {errors.kod.message}
                    </Text>
                  )}
                </View>
              </InfoCard>
              <View className="flex-1 py-5 justify-center items-center w-full">
                <ActiveButton
                  onPress={() =>
                    navigation.navigate("AccessUnlocked", {
                      id,
                      logo,
                      name,
                      percentage,
                      color,
                    })
                  }
                  text={"Odblokuj dostęp"}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default CardsStartPage;
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
    paddingHorizontal: 20,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    letterSpacing: 0.3,
  },
});
