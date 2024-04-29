import React, { ReactNode } from "react";
import { View } from "react-native";

const InfoCard = ({
  children,
  welcomeScreen,
}: {
  children: ReactNode;
  welcomeScreen: Boolean;
}) => {
  return (
    <View
      className={`bg-semi-transparent flex-1 h-68  mx-5 ${!welcomeScreen && "mt-6 mb-5 py-7"}  pt-7   border border-borderColorSemiTransparent rounded-3xl`}
    >
      {children}
    </View>
  );
};

export default InfoCard;
