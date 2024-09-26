import { Asset } from "expo-asset";
import React from "react";
import { Image, Text, View } from "react-native";

type Props = {};

const LanguageLogo = ({ logo, isQuize }: { logo: any; isQuize: boolean }) => {
  // const [languageLogo, setLanguageLogo] = React.useState<any>();

  // React.useEffect(() => {
  //   const loadAsset = async () => {
  //     const asset = await Asset.loadAsync(require(`../../assets/${logo}.png`));
  //     setLanguageLogo(asset);
  //   };
  //   loadAsset();
  // }, [logo]);

  // return languageLogo ? (
  return (
    <View>
      {isQuize ? (
        <View className="w-14 h-14 bg-slate-300  rounded-full relative justify-center items-center">
        
          <Image source={logo} className="w-10 h-10  absolute" />
        </View>
      ) : (
        <View className="justify-center items-center flex pb-3">
            
          <Image source={logo} className="w-14 h-14" />
        </View>
      )}
    </View>
  );
  //   ): null;
};

export default LanguageLogo;
