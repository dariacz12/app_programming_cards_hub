import React from "react";
import { Dimensions, FlatList, Image, StyleSheet, View } from "react-native";
import { API_URL, UPLOADS_URL } from "../context/AuthContext";

const { width, height } = Dimensions.get("screen");

interface QuizPhoto {
  documentId: string;
  url: string;
}

interface QuizPhotosProps {
  photos: QuizPhoto[];
}

const Slider = ({ photos }: QuizPhotosProps) => {
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
          const fullUrl = `${API_URL}${item.url}`;
          console.log("Image URL:", fullUrl);

          return (
            <View style={[styles.container, { height: height / 3 }]}>
              <Image
                source={{ uri: `${UPLOADS_URL}${item.url}` }}
                style={styles.image}
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
