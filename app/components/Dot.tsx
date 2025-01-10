import React from "react";
import {  View } from "react-native";

const Dot = ({ active }: { active: boolean }) => {
  return (
    <View
      className={`${active ? "bg-active border-borderColorActive" : "bg-semi-transparent  border-borderColorSemiTransparent"} m-2 w-2 h-2 rounded-full border`}
    ></View>
  );
};

export default Dot;
