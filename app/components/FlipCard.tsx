import React, { useEffect, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Image,
  useWindowDimensions,
} from "react-native";
import Animated, {
  interpolate,
  runOnJS,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import H1Text from "./H1Text";
import {
  Gesture,
  GestureDetector,
  GestureStateChangeEvent,
  PanGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { UPLOADS_URL } from "../context/AuthContext";
import { CardItem } from "../screens/CardsStudyPage";

// var negativeArray: number[] = [];
// var positiveArray: number[] = [];

interface FlipCardsProps {
  documentId: string;
  maxVisibleItem: number;
  cardStyle: { width: number; height: number };
  direction?: string;
  duration?: number;
  currentCard: CardItem;
  index: number;
  dataLength: number;
  currentIndex: number;
  animatedValue: SharedValue<number>;
  setNewData: React.Dispatch<React.SetStateAction<CardItem[]>>;
  setPositiveCount: React.Dispatch<React.SetStateAction<number>>;
  setNegativeCount: React.Dispatch<React.SetStateAction<number>>;
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
  positiveCount: number;
  negativeCount: number;
}

const flippedContentStyles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
    height: "100%",
    width: "100%",
    borderRadius: 16,
  },
});

const regularContentStyles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});

const FlipCard = ({
  documentId,
  index,
  cardStyle,
  direction = "y",
  duration = 500,
  currentCard,
  dataLength,
  maxVisibleItem,
  currentIndex,
  animatedValue,
  setCurrentQuestionIndex,
  setNewData,
  setPositiveCount,
  setNegativeCount,
  positiveCount,
  negativeCount,
}: FlipCardsProps) => {
  const isDirectionX = direction === "x";
  const isFlipped = useSharedValue(false);

  // useEffect(()=>{
  // console.log('negative:', negativeArray.length);
  //  setNegativeCount(negativeArray.length)
  //  console.log('count changed negative:', negativeArray.length);
  // },[negativeArray.length])

  // useEffect(()=>{
  //   console.log('positive:', positiveArray.length);
  //   setPositiveCount(positiveArray.length)
  //   console.log('count change positive:', positiveArray.length);
  //  },[positiveArray.length])

  const handlePress = () => {
    if (currentIndex === index) {
      isFlipped.value = !isFlipped.value;
    }
  };

  const regularCardAnimatedStyle = useAnimatedStyle(() => {
    const spinValue = interpolate(Number(isFlipped.value), [0, 1], [0, 180]);
    const rotateValue = withTiming(`${spinValue}deg`, { duration });

    return {
      transform: [
        isDirectionX ? { rotateX: rotateValue } : { rotateY: rotateValue },
      ],
    };
  });

  const flippedCardAnimatedStyle = useAnimatedStyle(() => {
    const spinValue = interpolate(Number(isFlipped.value), [0, 1], [180, 360]);
    const rotateValue = withTiming(`${spinValue}deg`, { duration });

    return {
      transform: [
        isDirectionX ? { rotateX: rotateValue } : { rotateY: rotateValue },
      ],
    };
  });

  // console.log("swipedNegativeIndexArray1", swipedNegativeIndexArray);

  const navigation = useNavigation<any>();
  const isPressed = useSharedValue(false);
  const offset = useSharedValue({ x: 0, y: 0 });
  const { width } = useWindowDimensions();

  // useEffect(() => {
  //   console.log("swipedNegativeIndexArray updated:", swipedNegativeIndexArray);
  // }, [swipedNegativeIndexArray]);

  // const zrobWszystko = (currentIndex: number, e: GestureStateChangeEvent<PanGestureHandlerEventPayload>) => {
  //   setCurrentQuestionIndex(currentIndex + 1);
  //   console.log("zrobWszystko called with currentIndex:", currentIndex, "e:", e);
  //   if (e.translationX < 0) {
  //     console.log("Swiped left:", currentIndex);
  //     setSwipedNegativeIndexArray(prev => {
  //       const newArray = [...prev, currentIndex];
  //       console.log("Updated swipedNegativeIndexArray (inside):", newArray);
  //       return newArray;
  //     });
  //   } else if (e.translationX > 0) {
  //     console.log("Swiped right:", currentIndex);
  //     setSwipedPositiveIndexArray(prev => [...prev, currentIndex]);
  //   }
  // };
  // const zrobWszystko = (currentIndex: number, translationX: number) => {
  //   setCurrentQuestionIndex(currentIndex + 1);

  //   console.log("Swiping. Current Index:", currentIndex, "TranslationX:", translationX);

  //   if (translationX < 0) {
  //     setSwipedNegativeIndexArray(prev => {
  //       const newArray = [...prev, currentIndex];
  //       console.log("Updated swipedNegativeIndexArray:", newArray);
  //       return newArray;
  //     });
  //   } else if (translationX > 0) {
  //     setSwipedPositiveIndexArray(prev => {
  //       const newArray = [...prev, currentIndex];
  //       console.log("Updated swipedPositiveIndexArray:", newArray);
  //       return newArray;
  //     });
  //   }
  // }
  const swipeLogic = (currentIndex: number, translationX: number) => {
    setCurrentQuestionIndex(currentIndex + 1);

    if (translationX < 0) {
      setNegativeCount(negativeCount + 1);
    } else if (translationX > 0) {
      setPositiveCount(positiveCount + 1);
    }
    if (currentIndex === dataLength - 1) {
      navigation.navigate("CardsResultPage", {
        negativeCount,
        positiveCount,
        documentId,
      });
    }
  };
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: offset.value.x },
        { translateY: offset.value.y },
        { scale: withSpring(isPressed.value ? 1.2 : 1) },
      ],
      backgroundColor: isPressed.value ? "yellow" : "transparent",
      borderRadius: "23px",
    };
  });
  const start = useSharedValue({ x: 0, y: 0 });
  const translateX = useSharedValue(0);
  const directionX = useSharedValue(0);
  const pan = Gesture.Pan()
    .onUpdate((e) => {
      // console.log(e.translationX);
      const isSwipeRight = e.translationX > 0;
      directionX.value = isSwipeRight ? 1 : -1;
      if (currentIndex === index) {
        translateX.value = e.translationX;
        animatedValue.value = interpolate(
          Math.abs(e.translationX),
          [0, width],
          [index, index + 1],
        );
        // console.log(animatedValue.value);
      }
    })
    .onEnd((e) => {
      if (currentIndex === index) {
        if (Math.abs(e.translationX) > 150 || Math.abs(e.velocityX) > 1000) {
          translateX.value = withTiming(
            1.5 * width * directionX.value,
            {},
            () => {
              runOnJS(swipeLogic)(currentIndex, e.translationX);
              // runOnJS(zrobWszystko)(currentIndex, e.translationX);
              // runOnJS(zrobWszystko)(currentIndex, e)
              // runOnJS((swipedNegativeIndexArray: number[], swipedPositiveIndexArray: number[]) => {

              //   // runOnJS(setSwipedNegativeIndexArray)([currentIndex]);

              // })(swipedNegativeIndexArray, swipedPositiveIndexArray)
              // runOnJS(setCurrentQuestionIndex)(currentIndex + 1);
              //   if(e.translationX<0){
              //     console.log("zopka 1")
              //     runOnJS(setSwipedNegativeIndexArray)([currentIndex]);

              //   // runOnJS(() => {

              //   //   setSwipedNegativeIndexArray([...swipedNegativeIndexArray,currentIndex])
              //   // }
              //   // )
              // }
              //     if(e.translationX>0){
              //     runOnJS(() => {

              //     setSwipedPositiveIndexArray([...swipedPositiveIndexArray,currentIndex])

              // }) }
            },
          );
          animatedValue.value = withTiming(currentIndex + 1);
        } else {
          translateX.value = withTiming(0, { duration: 500 });
          animatedValue.value = withTiming(currentIndex);
        }
      }
    });

  const animatedSwipeStyles = useAnimatedStyle(() => {
    const currentItem = index === currentIndex;
    const rotateZ = interpolate(
      Math.abs(translateX.value),
      [0, width],
      [0, 20],
    );
    const translateY = interpolate(
      animatedValue.value,
      [index - 1, index],
      [-10, 0],
    );
    const scale = interpolate(
      animatedValue.value,
      [index - 1, index],
      [0.9, 1],
    );
    const opacity = interpolate(
      animatedValue.value + maxVisibleItem,
      [index, index + 1],
      [0, 1],
    );
    return {
      transform: [
        { translateX: translateX.value },
        {
          scale: currentItem ? 1 : scale,
        },
        {
          translateY: currentItem ? 0 : translateY,
        },
        {
          rotateZ: currentItem ? `${directionX.value * rotateZ}deg` : "0deg",
        },
      ],
      opacity: index < maxVisibleItem + currentIndex ? 1 : opacity,
    };
  });

  return (
    <GestureDetector gesture={pan}>
      <Pressable onPress={handlePress}>
        <Animated.View style={animatedStyles}>
          <Animated.View style={[animatedSwipeStyles]}>
            <Animated.View
              style={[
                flipCardStyles.regularCard,
                cardStyle,
                {
                  borderWidth: 0.5,
                  borderColor: "black",
                  borderRadius: 16,
                },
                regularCardAnimatedStyle,
              ]}
            >
              <View style={regularContentStyles.card}>
                <Text className="text-textBlue font-bold text-xl text-center mx-6">
                  {currentCard.question}
                </Text>
              </View>
            </Animated.View>
            <Animated.View
              style={[
                flipCardStyles.flippedCard,
                cardStyle,
                flippedCardAnimatedStyle,
              ]}
            >
              <View style={flippedContentStyles.card}>
                <Image
                  source={{
                    uri: `${UPLOADS_URL}${currentCard.answerImage[0].url}`,
                  }}
                  style={flippedContentStyles.image}
                />
              </View>
            </Animated.View>
          </Animated.View>
        </Animated.View>
      </Pressable>
    </GestureDetector>
  );
};

const flipCardStyles = StyleSheet.create({
  regularCard: {
    position: "absolute",
    zIndex: 1,
  },
  flippedCard: {
    backfaceVisibility: "hidden",
    zIndex: 2,
  },
});
export default FlipCard;
