import * as React from 'react';
import {
  Easing,
  TextInput,
  Animated,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import Svg, { G, Circle, Rect } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export default function ProgressCircular({
  percentage,
  radius,
  strokeWidth,
  duration,
  color,
  delay,
  max,
  name
}:{percentage: number
    radius: number
    strokeWidth: number
    duration: number
    color: string
    delay: number
    max: number
    name: string}) {

  
  const animated = React.useRef(new Animated.Value(0)).current;
  const circleRef = React.useRef();
  const inputRef = React.useRef();
  const circumference = 2 * Math.PI * radius;
  const halfCircle = radius + strokeWidth;

  const animation = (toValue) => {
    return Animated.timing(animated, {
      delay: 0,
      toValue,
      duration,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  };

  React.useEffect(() => {
    animation(percentage);
    animated.addListener((v) => {
      const maxPerc = 100 * v.value / max;
      const strokeDashoffset = circumference - (circumference * maxPerc) / 100;
      if (inputRef?.current) {
        inputRef.current.setNativeProps({
          text: `${Math.round(v.value)}%`,
        });
      }
      if (circleRef?.current) {
        circleRef.current.setNativeProps({
          strokeDashoffset,
        });
      }
    }, [max, percentage,name]);

    return () => {
      animated.removeAllListeners();
    };
  });

  return (
    <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Svg
        height={radius * 6}
        width={radius * 6}
        viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}
        >
        <G
          rotation="-90"
          origin={`${halfCircle}, ${halfCircle}`}>
          <Circle
            ref={circleRef}
            cx="50%"
            cy="50%"
            r={radius}
            fill="transparent"
            stroke={"#66347F"}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDashoffset={circumference}
            strokeDasharray={circumference}
          />
          <Circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
            strokeOpacity=".1"
          />
        </G>
      </Svg>

      <AnimatedTextInput
        ref={inputRef}
        underlineColorAndroid="transparent"
        editable={false}
        defaultValue="0"
        style={[
          StyleSheet.absoluteFillObject,
          { fontSize: radius / 2, color: '#FFFFFF'},
          styles.text,
        ]}
      />
       <Text
          style={{
            position: 'absolute', 
            top:25,
            textAlign: 'center',
            justifyContent:'center',
            color: '#FFFFFF',
            fontSize: 18,
          }}
        >
         {name}
        </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: { fontWeight: '900', textAlign: 'center',bottom:20 },
});