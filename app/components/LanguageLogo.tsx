import React from "react";
import { Image, View } from "react-native";
import { UPLOADS_URL } from "../context/AuthContext";

const LanguageLogo = ({ logo, isQuize }: { logo: any; isQuize: boolean }) => {

  return (
    <View>
      {isQuize ? (
        <View className="w-14 h-14 bg-slate-300  rounded-full relative justify-center items-center">
          <Image
            source={{ uri: `${UPLOADS_URL}${logo.url}` }}
            className="w-10 h-10  absolute"
          />
        </View>
      ) : (
        <View className="justify-center items-center flex pb-3">
          <Image
            source={{ uri: `${UPLOADS_URL}${logo.url}` }}
            className="w-14 h-14"
          />
        </View>
      )}
    </View>
  );
};

export default LanguageLogo;
