import React from "react";
import { Image } from "react-native";

const Avatar = ({ homeScreen }: { homeScreen: Boolean }) => {
  const avatarplaceholder = require("../../assets/avatarplaceholder.jpg");
  return (
    <Image
      source={avatarplaceholder}
      className={`rounded-full border-2  border-borderColorActive ${homeScreen ? "w-16 h-16" : "w-28 h-28"}`}
    />
  );
};

export default Avatar;
