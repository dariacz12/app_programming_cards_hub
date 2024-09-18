import { StyleSheet, Text, View } from "react-native";
import React, { ReactNode } from "react";

const H2Text = ({ text, textCenter }: { text: string, textCenter: boolean }) => {
  return (
    <Text className={`text-white font-bold text-xl ${textCenter? "text-center": "text-left"}`}>{text}</Text>
  );
};

export default H2Text;

const styles = StyleSheet.create({});
