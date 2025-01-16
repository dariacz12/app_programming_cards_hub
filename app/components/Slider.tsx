import React from "react";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import { UPLOADS_URL } from "../context/AuthContext";
import { Image } from "expo-image";
const { width, height } = Dimensions.get("screen");

interface QuizPhoto {
  documentId: string;
  url: string;
}

interface QuizPhotosProps {
  photos?: QuizPhoto[];
  blurHash?: string;
}

const Slider = ({ photos, blurHash }: QuizPhotosProps) => {
  return (
    <View>
      <FlatList
        data={photos}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => item.documentId}
        renderItem={({ item }) => {
          return (
            <View style={[styles.container, { height: height / 3 }]}>
              <Image
                source={{ uri: `${UPLOADS_URL}${item.url}` }}
                style={styles.image}
                placeholder={{ blurHash }}
              />
            </View>
          );
        }}
      ></FlatList>
    </View>
  );
};

export default Slider;
const styles = StyleSheet.create({
  container: {
    width,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
