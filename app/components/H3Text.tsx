import { StyleSheet, Text, View } from "react-native";
import React, { ReactNode } from "react";

const H3Text = ({ text }: { text: string }) => {
  return <Text className="text-white  text-lg text-center">{text}</Text>;
};

export default H3Text;

const styles = StyleSheet.create({});
