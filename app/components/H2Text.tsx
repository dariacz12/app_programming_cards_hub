import { StyleSheet, Text, View } from "react-native";
import React, { ReactNode } from "react";

const H2Text = ({ text }: { text: string }) => {
  return (
    <Text className="text-white font-bold text-xl text-center">{text}</Text>
  );
};

export default H2Text;

const styles = StyleSheet.create({});
