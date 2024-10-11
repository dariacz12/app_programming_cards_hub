import React, { ReactNode } from "react";
import { View } from "react-native";

const InfoCard = ({
  children,
  welcomeScreen,
  isFlex1 = true,
  isQuize = false,
}: {
  children: ReactNode;
  welcomeScreen: Boolean;
  isFlex1?: Boolean;
  isQuize?: Boolean;
}) => {
  return (
    <View
      className={`${isQuize ? "bg-block" : "bg-semi-transparent"} ${isFlex1 && "flex-1"} h-68  mx-5 ${!welcomeScreen && "mt-6 mb-5 py-7"}  pt-7   border border-borderColorSemiTransparent rounded-3xl`}
    >
      {children}
    </View>
  );
};

export default InfoCard;
