import React, { ReactNode } from "react";
import { Image, Text, View } from "react-native";
import H4Text from "./H4Text";

const CategoryElement = ({
  children,
  text,
}: {
  children: ReactNode;
  text: string;
}) => {
  return (
    <View className="flex justify-start items-center p-1.5 ">
      <View
        className={`bg-semi-transparent justify-center items-center flex h-20 w-20  border border-borderColorSemiTransparent rounded-3xl`}
      >
        <Image source={children} className={`rounded-ful w-14 h-14`} />
      </View>
      <View className="w-20 pt-3">
        <H4Text text={text} />
      </View>
    </View>
  );
};

export default CategoryElement;
