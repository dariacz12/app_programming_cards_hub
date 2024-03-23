import React, { ReactNode } from "react";
import { View } from "react-native";

const InfoCard = ({ children }: { children: ReactNode }) => {
  return (
    <View className="bg-semi-transparent flex-1 h-68 space-y-4 mx-5 mt-6 mb-5  py-7 border border-borderColorSemiTransparent rounded-3xl">
      {children}
    </View>
  );
};

export default InfoCard;
