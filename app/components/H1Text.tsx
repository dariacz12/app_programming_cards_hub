import { StyleSheet, Text, View } from "react-native";
import React from "react";

const H1Text = ({ text }: { text: string }) => {
  return (
    <Text className="text-white font-bold text-2xl text-center">{text}</Text>
  );
};

export default H1Text;

const styles = StyleSheet.create({});
