import { StyleSheet, Text, View } from "react-native";
import React, { ReactNode } from "react";

const H4Text = ({ text }: { text: string }) => {
  return <Text className="text-white text-sm text-center">{text}</Text>;
};

export default H4Text;

const styles = StyleSheet.create({});
