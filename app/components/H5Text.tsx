import { StyleSheet, Text, View } from "react-native";
import React from "react";

const H5Text = ({ text }: { text: string }) => {
  return <Text className="text-white text-xs text-center">{text}</Text>;
};

export default H5Text;

const styles = StyleSheet.create({});
