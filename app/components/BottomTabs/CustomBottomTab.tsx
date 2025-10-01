import React, { FC, useEffect, useMemo, useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import Svg, { Path } from "react-native-svg";
import Animated, {
  runOnJS,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { interpolatePath } from "react-native-redash";

import TabItem from "./TabItem";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import usePath from "../../hooks/usePath";
import { getPathXCenter } from "../../utils/Path";
import { SCREEN_WIDTH } from "../../constants/Screen";
import EventEmitter from "react-native/Libraries/vendor/emitter/EventEmitter";
import { useNavigationState } from "@react-navigation/native";

const AnimatedPath = Animated.createAnimatedComponent(Path);
export const eventEmitter = new EventEmitter();

export const CustomBottomTab: FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const { containerPath, curvedPaths, tHeight } = usePath();
  const circleXCoordinate = useSharedValue(0);
  const progress = useSharedValue(1);

  const navigationState = useNavigationState((state) => state);
  const [activeIndex, setActiveIndex] = useState("Home");


  useEffect(() => {
    const subscription = eventEmitter.addListener(
      "updateActiveTab",
      (index) => {
        setActiveIndex(state.routes[index]?.name);
      },
    );

    const animationSubscription = eventEmitter.addListener(
      "animateTab",
      (index) => {
        progress.value = withTiming(index + 1);
      },
    );
    setActiveIndex(state.routes[state.index]?.name);

    return () => {
      subscription.remove();
      animationSubscription.remove();
    };
  }, [state]);

  const handleMoveCircle = (currentPath: string) => {
    circleXCoordinate.value = getPathXCenter(currentPath);
  };
  const selectIcon = (routeName: string) => {
    switch (routeName) {
      case "Account":
        return "user";
      case "Home":
        return "home";

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
    };
  });

  const [isNavigating, setIsNavigating] = useState(false);

  const handleTabPress = (index: number, tab: string) => {
    setActiveIndex(tab);
    setIsNavigating(true);
    navigation.navigate(tab);
    progress.value = withTiming(index + 1);
  };
  useEffect(() => {
    if (isNavigating) {

      setIsNavigating(false);
    }
  }, [activeIndex, isNavigating]);

  const opacity = useSharedValue(0.9);
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: 1,
  }));

  const blurredStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const isCurvedTabScreen =
    state.routes[state.index].name === "Home" ||
    state.routes[state.index].name === "Account";

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
        // preserveAspectRatio="xMidYMid slice"
      />
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
          {isCurvedTabScreen ? (
            <AnimatedPath fill={"#262450"} animatedProps={animatedProps} />
          ) : (
            <Path
              fill={"#262450"}
              d={`M0,0 L${SCREEN_WIDTH},0 L${SCREEN_WIDTH},${tHeight} L0,${tHeight} Z`}
            />
          )}
        </Svg>
      </Animated.View>
      <View
        style={[
          styles.tabItemsContainer,
          {
            height: tHeight,
            zIndex: 3,
          },
        ]}
      >
        {state.routes
          .filter((route) => {
            return route.name === "Home" || route.name === "Account";
          })
          .map((route, index) => {
            const { options } = descriptors[route.key];
            const label = options.tabBarLabel
              ? options.tabBarLabel
              : route.name;
            return (
              <TabItem
                key={route.name}
                label={label as string}
                icon={selectIcon(route.name)}
                activeRoute={state.routes[state.index]?.name}
                index={index}
                onTabPress={() => handleTabPress(index, route.name)}
              />
            );
          })}
      </View>
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
    bottom: 0,
  },
});
