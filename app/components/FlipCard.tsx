import React from 'react';
import { Pressable, SafeAreaView, View, StyleSheet, Text, Image } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import H1Text from './H1Text';


interface FlipCardsProps {
    isFlipped: boolean;
    cardStyle: { width: number; height: number };
    direction: string;
    duration: number;
    currentCard:{question: string, answer: string}
  }

  const flippedContentStyles = StyleSheet.create({
    card: {
      flex: 1,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
        flex: 1,
        height: "100%",
        width:"100%",
        borderRadius: 16,
    },
  });
  
  const regularContentStyles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  });
 const FlipCard = ({
  isFlipped,
  cardStyle,
  direction = 'y',
  duration = 500,
  currentCard,
}: FlipCardsProps) => {
  const isDirectionX = direction === 'x';

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

  return (
    <View>
      <Animated.View
        style={[
          flipCardStyles.regularCard,
          cardStyle,
          regularCardAnimatedStyle,
        ]}>
    <View style={regularContentStyles.card}>
    <Text className="text-textBlue font-bold text-xl text-center mx-6">{currentCard.question}</Text>
    </View>
      </Animated.View>
      <Animated.View
        style={[
          flipCardStyles.flippedCard,
          cardStyle,
          flippedCardAnimatedStyle,
        ]}>
        <View style={flippedContentStyles.card}>
        <Image source={currentCard.answer}  style={flippedContentStyles.image}/>
      </View>
      </Animated.View>
    </View>
  );
};

const flipCardStyles = StyleSheet.create({
  regularCard: {
    position: 'absolute',
    zIndex: 1,
  },
  flippedCard: {
    backfaceVisibility: 'hidden',
    zIndex: 2,
  },
});
export default FlipCard;
