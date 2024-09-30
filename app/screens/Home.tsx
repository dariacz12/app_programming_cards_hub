import {
  ScrollView,
  ScrollViewBase,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import H1Text from "../components/H1Text";
import H4Text from "../components/H4Text";
import Avatar from "../components/Avatar";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Rings } from "../components/SkiaProgressComponents/Rings";
import H3Text from "../components/H3Text";
import CardBlock from "../components/CardBlock";
import Tabbar from "../components/Tabbar";
import QuizeBlock from "../components/QuizeBlock";
import ModalPopup from "../components/ModalPopup";
import { LinearGradient } from "expo-linear-gradient";

const quizes = [
  {
    logo: require("../../assets/react.png"),
    level: [1, 2, 3],
    name: "React",
  },
  {
    logo: require("../../assets/css.png"),
    level: [1],
    name: "CSS",
  },
  {
    logo: require("../../assets/php.png"),
    level: [1, 2, 3],
    name: "PHP",
  },
  {
    logo: require("../../assets/html.png"),
    level: [1],
    name: "HTML",
  },
  {
    logo: require("../../assets/java.png"),
    level: [1, 2],
    name: "Java",
  },
];
const blockes = [
  {
    logo: require("../../assets/javascript.png"),
    access: true,
    name: "JavaScript",
  },
  {
    logo: require("../../assets/css.png"),
    access: false,
    name: "CSS",
  },
  {
    logo: require("../../assets/react.png"),
    access: false,
    name: "React",
  },
  {
    logo: require("../../assets/java.png"),
    access: false,
    name: "Java",
  },
];
const Home = () => {
  const navigation = useNavigation<any>();
  const [notifications, setNotifications] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <ScrollView className="bg-primary">
        <View className=" py-[60] mb-14 bg-primary">
          <View className="flex-row justify-between mb-5 mx-10">
            <View style={{flexDirection: "row", height: 60, width:156}}>
              <View className="flex-1 ">
                <TouchableOpacity
                  className=""
                  onPress={() => navigation.navigate("Tabbar", {
                    screen: "Account"
                  })}
                >
                  <Avatar homeScreen={true} />
                </TouchableOpacity>
              </View>
              <View className="justify-center ml-3">
                <H4Text text={"Dzień dobry!"} />
                <Text className="text-sm  text-secondary">Ruby</Text>
              </View>
            </View>
            <View className="justify-center">
              <TouchableOpacity  onPress={() => navigation.navigate("Notifications")}>
                <View className="relative">
                  <MaterialIcons
                    name="notifications"
                    size={24}
                    color="ghostwhite"
                  />
                  {!notifications && (
                    <View className="absolute top-0 right-0.5  rounded-full bg-yellowColor w-2 h-2"></View>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View className="mt-32 bg-semi-transparent h-full  flex items-center justify-center  relative border border-t-borderColorSemiTransparent ">
            
            <View className="flex-1 top-28">
              <View>
                <View className="right-24 mt-7">
                  <H3Text text={"Bezpłatne quizy"} />
                </View>
                {quizes.map((quize, index) => {
                  return (  
                  <TouchableOpacity 
                    onPress={() => navigation.navigate("Tabbar", {screen:"QuizeStartPage", params:{id:1}})}>
                    <View className="flex mt-7 mx-4 flex-row items-center justify-start">
                        <QuizeBlock key={index} quize={quize}       
                       />
                    </View> 
                    </TouchableOpacity>
                  );
                })}
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
                    Talia kart w eleganskim pudełku + jej digital wersja w aplikacji + przykłady w edytorze kodu
                    </Text>
                  </LinearGradient>
                </TouchableWithoutFeedback>
              </View>
            </ModalPopup>
            <View className="flex-row ju ml-10 mt-7">
                <H3Text text={"Karty fizyczne"} />
              <TouchableOpacity className='px-2 justify-center items-center flex'
                        onPress={() => setModalVisible(!modalVisible)}>
                           <MaterialCommunityIcons name="open-in-new" size={18} color="#B6B4CA" />
                  </TouchableOpacity>
            </View>
             
              <View className="flex-wrap flex-row flex w-full m-4 mb-32">
                {/* {blockes.map((block, index) => {
                   return (  
                    <TouchableOpacity 
                       onPress={() => navigation.navigate("Tabbar", {screen: "CardsStartPage",params: {id:1}})}>
                       <CardBlock key={index} block={block} />
                      </TouchableOpacity>
                    )
                })} */}
              </View>
            </View>
          </View>

          {/* <View className="flex-1">
           <Rings />
        </View> */}
        </View>
        <View className="absolute bg-red-300 top-[331]">
              <View className="relative justify-center items-center  w-screen">
                <View
                  className="h-32 w-64 bg-primary border absolute border-b-borderColorSemiTransparent border-l-borderColorSemiTransparent  border-r-borderColorSemiTransparent  border-t-primaryBorder
                              rounded-bl-full rounded-br-full  "
                ></View>
              </View>
            </View>
      </ScrollView>
      {/* <Tabbar/> */}
    </>
  );
};

export default Home;

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
    letterSpacing: 0.4,
    
  },
});