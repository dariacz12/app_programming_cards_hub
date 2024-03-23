import React from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

const Animation = ({ source }: { source: any }) => {
  return (
    <View className="flex-1 justify-center items-center">
      <LottieView source={source} autoPlay loop style={styles.animation} />
    </View>
  );
};

const styles = StyleSheet.create({
  animation: {
    width: 300,
    height: 250,
  },
});

export default Animation;
