import React, { FC, useMemo, useState } from "react";
import { StyleSheet, View, Image, ImageBackground } from "react-native";
import Svg, { Path, Mask } from "react-native-svg";
import Animated, {
  interpolateColor,
  runOnJS,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { interpolatePath } from "react-native-redash";

import TabItem from "./TabItem";
import AnimatedCircle from "./AnimatedCircle";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import usePath from "../../hooks/usePath";
import { getPathXCenter } from "../../utils/Path";
import { SCREEN_WIDTH } from "../../constants/Screen";

import { BlurView } from "expo-blur";
import { center } from "@shopify/react-native-skia";

const AnimatedPath = Animated.createAnimatedComponent(Path);
export const CustomBottomTab: FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const { containerPath, curvedPaths, tHeight } = usePath();
  const circleXCoordinate = useSharedValue(0);
  const progress = useSharedValue(1);
  const handleMoveCircle = (currentPath: string) => {
    circleXCoordinate.value = getPathXCenter(currentPath);
  };
  const selectIcon = (routeName: string) => {
    switch (routeName) {
      case "Home":
        return "home";
      case "Account":
        return "user";
      default:
        return "home";
    }
  };
  const animatedProps = useAnimatedProps(() => {
    const currentPath = interpolatePath(
      progress.value,
      Array.from({ length: curvedPaths.length }, (_, index) => index + 1),
      curvedPaths,
    );
    runOnJS(handleMoveCircle)(currentPath);
    return {
      d: `${containerPath} ${currentPath}`,
      //  stroke: 'red', // Your desired border color
      //  strokeWidth: 2, // Your desired border width
      //  borderTopWidth: 22, // Use the shared value
      //   borderTopColor: "#ff2200", // Set the border color
    };
  });

  const handleTabPress = (index: number, tab: string) => {
    navigation.navigate(tab);
    progress.value = withTiming(index);
  };
  const opacity = useSharedValue(0.9);
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: 1,
  }));

  const blurredStyle = useAnimatedStyle(() => ({
    opacity: opacity.value, // Adjust opacity for desired blur level
  }));

  return (
    <View style={styles.tabBarContainer}>
      <Image
        resizeMode="repeat"
        style={{
          bottom: 0,
          height: 98,
          position: "absolute",
          zIndex: 2,
        }}
        source={require("../../../assets/bbblurry.png")}
        preserveAspectRatio="xMidYMid slice"
      />

      {/* <Animated.View style={[blurredStyle, styles.blurredBackground]}>
       
      </Animated.View> */}
      <Animated.View
        style={[
          animatedStyle,
          {
            shadowColor: "#48D9F4",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 1,
            shadowRadius: 5,
          },
        ]}
      >
        <Svg width={SCREEN_WIDTH} height={tHeight} style={[styles.shadowMd]}>
          <AnimatedPath
            fill={"#262450"}
            animatedProps={animatedProps}
            // style={[ styles.box]}
          />
        </Svg>
      </Animated.View>
      {/* <AnimatedCircle circleX={circleXCoordinate} /> */}
      {/* <BlurView intensity={100}  tint="light" style={styles.blurContainer}> */}
      <View
        style={[
          styles.tabItemsContainer,
          {
            height: tHeight,
            zIndex: 3,
          },
        ]}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel ? options.tabBarLabel : route.name;
          return (
            <TabItem
              key={index.toString()}
              label={label as string}
              icon={selectIcon(route.name)}
              activeIndex={state.index + 1}
              index={index}
              onTabPress={() => handleTabPress(index + 1, route.name)}
            />
          );
        })}
      </View>
      {/*  </BlurView>  */}
    </View>
  );
};
export default CustomBottomTab;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBarContainer: {
    position: "absolute",
    bottom: 0,
    zIndex: 2,
  },
  tabItemsContainer: {
    position: "absolute",
    flexDirection: "row",
    width: "100%",
  },
  shadowMd: {
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 3 },
  },
  box: {
    borderWidth: 1,
    borderColor: "#00c3ff",
  },
  blurredBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0, // Ensure it covers the entire content area
  },
});
