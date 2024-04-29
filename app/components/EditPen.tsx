import { Entypo } from "@expo/vector-icons";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { View } from "react-native";

type Props = {};

const EditPen = (props: Props) => {
  return (
    //     <Image source={avatarplaceholder} className="w-28 h-28 rounded-full border-2 border-borderColorActive" />
    <View className="w-8 h-8 rounded-full border-2 border-whiteColor bg-active justify-center items-center">
      <FontAwesome5 name="pen" size={16} color="white" />
    </View>
  );
};

export default EditPen;
