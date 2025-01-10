import React from "react";
import {
  Pressable,
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
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { UPLOADS_URL } from "../context/AuthContext";
import useCurrentUser from "../hooks/api/useCurrentUser";
import { CardItem } from "../types/CardItem";
import { AnswerAttemt } from "../types/AnswerAttemt";
import { CardsAttempt } from "../types/CardAttempt";
import { saveCardsAttempt } from "../actions/saveCardsAttempt";
import { UserCardAnswer } from "../types/UserCardAnswer";

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
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
  activeQuestionsList: CardItem[];
  userAnswers: UserCardAnswer[];
  setUserAnswers: React.Dispatch<React.SetStateAction<UserCardAnswer[]>>;
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  incorrect: number;
  setIncorrect: React.Dispatch<React.SetStateAction<number>>;
  cardData: CardItem[];
  lastCardsAttemptsResultAnswers: AnswerAttemt[];
  lastCardsAttemptsResult?: CardsAttempt;
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
  activeQuestionsList,
  userAnswers,
  setUserAnswers,
  score,
  setScore,
  incorrect,
  setIncorrect,
  cardData,
  lastCardsAttemptsResultAnswers,
  lastCardsAttemptsResult,
}: FlipCardsProps) => {
  const isDirectionX = direction === "x";
  const isFlipped = useSharedValue(false);
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
  const navigation = useNavigation<any>();
  const isPressed = useSharedValue(false);
  const offset = useSharedValue({ x: 0, y: 0 });
  const { width } = useWindowDimensions();

  const updateUserAnswers = (
    isCorrect: boolean,
    userAnswers: UserCardAnswer[],
  ) => {
    const updatedAnswers = [
      ...userAnswers,
      { questionId: currentCard.documentId, isCorrect },
    ];
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    } else {
      setIncorrect((prevIncorrect) => prevIncorrect + 1);
    }

    setUserAnswers(updatedAnswers);

    return updatedAnswers;
  };

  const swipeLogic = async (
    currentIndex: number,
    translationX: number,
    userAnswers: UserCardAnswer[],
  ) => {
    setCurrentQuestionIndex(currentIndex + 1);
    const isCorrect = translationX > 0;
    const result = updateUserAnswers(isCorrect, userAnswers);

    if (currentIndex === dataLength - 1) {
      try {
        let response;
        userAnswers &&
          (response = await saveCardsAttempt(
            result,
            lastCardsAttemptsResultAnswers,
            cardData,
            lastCardsAttemptsResult,
            documentId,
          ));
        if (response?.status === 200) {
          navigation.navigate("CardsResultPage", {
            userId: userData?.documentId,
            documentId,
          });
        }
      } catch {}
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
      const isSwipeRight = e.translationX > 0;
      directionX.value = isSwipeRight ? 1 : -1;
      if (currentIndex === index) {
        translateX.value = e.translationX;
        animatedValue.value = interpolate(
          Math.abs(e.translationX),
          [0, width],
          [index, index + 1],
        );
      }
    })
    .onEnd((e) => {
      if (currentIndex === index) {
        if (Math.abs(e.translationX) > 150 || Math.abs(e.velocityX) > 1000) {
          translateX.value = withTiming(
            1.5 * width * directionX.value,
            {},
            () => {
              runOnJS(swipeLogic)(currentIndex, e.translationX, userAnswers);
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

  const { data: userData } = useCurrentUser();

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
