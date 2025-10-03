import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import H2Text from "../components/H2Text";
import { useNavigation } from "@react-navigation/native";
import NotifictionItem from "../components/NotifictionItem";
import useNotificationsList from "../hooks/api/useNotificationsList";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Notifications = () => {
  const navigation = useNavigation<any>();
  const scrollView = useRef<ScrollView>(null);

  const { data: notifications } = useNotificationsList(navigation);
  console.log("notifications", notifications);
  console.log("ostatni element ", notifications[notifications.length - 1]);
  useEffect(() => {
    const storeData = async () => {
      try {
        await AsyncStorage.setItem(
          "@MyNotifications:key",
          JSON.stringify(notifications[notifications.length - 1]), // Convert object to JSON string
        );
        console.log("Data saved successfully");
      } catch (error) {
        console.error("Error saving data", error);
      }
    };
    storeData();
  }, [notifications]);

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
                <View testID="arrowBack">
                  <AntDesign name="left" size={24} color="ghostwhite" />
                </View>
              </TouchableOpacity>
              <View className="justify-center flex-1 items-center pr-4">
                <H2Text textCenter={true} text={"Powiadomienia"} />
              </View>
            </View>
          </View>
          <View className="mx-8 mb-4  bg-block h-1 rounded-lg " />
        </View>
        <View className="mb-32 flex-1">
          {notifications.length === 0 ? (
            <View className="items-center justify-center h-[600] flex-1 ">
              <Text className="text-secondary"> Brak powiadomień</Text>
            </View>
          ) : (
            notifications
              .slice()
              .reverse()
              .map(({ id, title, text }) => {
                return (
                  <NotifictionItem key={id}>
                    <Text className="leading-5 text-base text-secondary px-4">
                      <Text className="font-bold text-primary">{title}</Text>{" "}
                      {text}
                    </Text>
                  </NotifictionItem>
                );
              })
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default Notifications;
