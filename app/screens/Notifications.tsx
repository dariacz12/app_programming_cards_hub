import { AntDesign } from "@expo/vector-icons";
import React, { useRef } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import H2Text from "../components/H2Text";
import { useNavigation } from "@react-navigation/native";
import Tabbar from "../components/Tabbar";
import NotifictionItem from "../components/NotifictionItem";

const Notifications = () => {
  const navigation = useNavigation<any>();
  const scrollView = useRef<ScrollView>(null);
  const notifications = [
    {
      id: "0",
      title: "Gotowy na nowe wyzwanie?",
      text: "Czas start",
    },
    {
      id: "1",
      title: "Czas na kodowanie!",
      text: "Rozwiąż quiz z React Native i sprawdź swoje umiejętności!",
    },
    {
      id: "2",
      title: "Nie poddawaj się!",
      text: " Pamiętaj, że nauka wymaga czasu i wytrwałości. Kontynuuj i osiągnij swoje cele!",
    },
    {
      id: "3",
      title: "Codzienna dawka kodu!",
      text: "Rozwiąż quiz z JavaScript i utrwal zdobytą wiedzę.",
    },
    {
      id: "4",
      title: "Sprawdź swoje umiejętności!",
      text: "Quiz z Javy już czeka na Ciebie.",
    },
    {
      id: "5",
      title: "Gotowy na nowe wyzwanie?",
      text: "Czas start",
    },
    {
      id: "6",
      title: "Czas na kodowanie!",
      text: "Rozwiąż quiz z React Native i sprawdź swoje umiejętności!",
    },
    {
      id: "7",
      title: "Nie poddawaj się!",
      text: " Pamiętaj, że nauka wymaga czasu i wytrwałości. Kontynuuj i osiągnij swoje cele!",
    },
    {
      id: "8",
      title: "Codzienna dawka kodu!",
      text: "Rozwiąż quiz z JavaScript i utrwal zdobytą wiedzę.",
    },
    {
      id: "9",
      title: "Sprawdź swoje umiejętności!",
      text: "Quiz z Javy już czeka na Ciebie.",
    },
  ];
  return (
    <>
      <ScrollView ref={scrollView} className="bg-semi-transparent flex flex-1">
        <View className="flex-1 ">
          <View className=" flex-1 mt-20 mb-8 mx-10">
            <View className="flex-1 items-center flex-row ">
              <TouchableOpacity
                className="p-1"
                onPress={() =>
                  navigation.navigate("Tabbar", { screen: "Home" })
                }
              >
                <AntDesign name="left" size={24} color="ghostwhite" />
              </TouchableOpacity>
              <View className="justify-center flex-1 items-center pr-4">
                <H2Text textCenter={true} text={"Powiadomienia"} />
              </View>
            </View>
          </View>
          <View className="mx-8 mb-4  bg-block h-1 rounded-lg " />
        </View>
        <View className="mb-32 flex-1">
          {!notifications ? (
            notifications.map(({ id, title, text }) => {
              return (
                <NotifictionItem>
                  <Text className="leading-5 text-base text-secondary px-4">
                    <Text className="font-bold text-primary">{title}</Text>{" "}
                    {text}
                  </Text>
                </NotifictionItem>
              );
            })
          ) : (
            <View className="items-center justify-center h-[600] flex-1 ">
              <Text className="text-secondary"> Brak powiadomień</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default Notifications;
