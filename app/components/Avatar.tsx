import { Image } from "expo-image";
import React from "react";
import { UPLOADS_URL } from "../context/AuthContext";

const Avatar = ({
  homeScreen,
  avatar,
}: {
  homeScreen: Boolean;
  avatar?: string;
}) => {
  const avatarplaceholder = require("../../assets/avatarplaceholder.jpg");


  return (
    <Image
      source={avatar ? { uri: `${UPLOADS_URL}${avatar}` } : avatarplaceholder}
      className={`rounded-full border-2  border-borderColorActive ${homeScreen ? "w-16 h-16" : "w-28 h-28"}`}
    />
  );
};

export default Avatar;
