import React from "react";
import { Image, Text, View } from "react-native";

type Props = {};

const Avatar = (props: Props) => {
  const avatarplaceholder = require("../../assets/avatarplaceholder.jpg");
  return (
    <Image
      source={avatarplaceholder}
      className="w-28 h-28 rounded-full border-2  border-borderColorActive"
    />
  );
};

export default Avatar;
