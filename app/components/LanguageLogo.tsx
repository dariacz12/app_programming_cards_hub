import React from "react";
import { Image, Text, View } from "react-native";

type Props = {};

const LanguageLogo = () => {
  const avatarplaceholder = require("../../assets/avatarplaceholder.jpg");
  return (
    <Image source={avatarplaceholder} className="w-16 h-16 rounded-full" />
  );
};

export default LanguageLogo;
