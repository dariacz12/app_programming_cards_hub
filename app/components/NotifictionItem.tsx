import React, { ReactNode } from "react";
import { View } from "react-native";

const NotifictionItem = ({ children }: { children: ReactNode }) => {
  return (
    <View
      className={`bg-primary h-68  mx-6 my-2  py-5 items-start justify-center  border border-borderColorSemiTransparent rounded-3xl`}
    >
      {children}
    </View>
  );
};

export default NotifictionItem;
