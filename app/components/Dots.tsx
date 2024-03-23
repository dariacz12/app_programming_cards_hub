import React from "react";
import { View } from "react-native";
import Dot from "./Dot";

const Dots = ({ activeIndex }: { activeIndex: number }) => {
  return (
    <View className="pb-8 flex-row px-2 justify-center items-center">
      <Dot active={activeIndex === 0} />
      <Dot active={activeIndex === 1} />
      <Dot active={activeIndex === 2} />
    </View>
  );
};

export default Dots;
