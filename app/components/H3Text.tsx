import { StyleSheet, Text, View } from "react-native";
import React, { ReactNode } from "react";

const H3Text = ({
  text,
  color = "white",
}: {
  text: string;
  color?: string;
}) => {
  if (color === "green") {
    return (
      <Text className="text-greanColor font-semibold  text-lg text-center">
        {text}
      </Text>
    );
  }
  if (color === "blue") {
    return (
      <Text className="text-lightBlue font-semibold  text-lg text-center">
        {text}
      </Text>
    );
  } else {
    return <Text className="text-white  text-lg text-center">{text}</Text>;
  }
};

export default H3Text;

const styles = StyleSheet.create({});
