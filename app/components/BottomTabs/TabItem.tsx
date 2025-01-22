import { Pressable, StyleSheet } from "react-native";
import React, { FC, useEffect, useState } from "react";
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Feather from "react-native-vector-icons/Feather";
import { SCREEN_WIDTH } from "../../constants/Screen";
import usePath from "../../hooks/usePath";
import { getPathXCenterByIndex } from "../../utils/Path";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type TabProps = {
  label: string;
  icon: string;
  index: number;

  onTabPress: () => void;
  activeRoute: string;
};
const ICON_SIZE = 25;
const LABEL_WIDTH = SCREEN_WIDTH / 4;
const TabItem: FC<TabProps> = ({
  label,
  icon,
  index,
  activeRoute,

  onTabPress,
}) => {
  const { curvedPaths } = usePath();

  const iconPosition = getPathXCenterByIndex(curvedPaths, index);
  console.log("1111111111activeRoute", activeRoute);
  const animatedActiveIndex = useSharedValue(activeRoute === "Home" ? 1 : 2);
  const [storedRoute, setStoredRoute] = useState<string | null>(null);

  useEffect(() => {
    const loadActiveRoute = async () => {
      try {
        const savedRoute = await AsyncStorage.getItem("activeRoute"); // Retrieve saved activeRoute
        if (savedRoute) {
          setStoredRoute(savedRoute);
        }
      } catch (error) {
        console.error("Error loading active route from AsyncStorage", error);
      }
    };

    loadActiveRoute();
  }, []);

  useEffect(() => {
    if (storedRoute) {
      animatedActiveIndex.value = storedRoute === "Home" ? 1 : 2;
    }
  }, [storedRoute]);

  useEffect(() => {
    const saveActiveRoute = async () => {
      try {
        await AsyncStorage.setItem("activeRoute", activeRoute);
      } catch (error) {
        console.error("Error saving active route to AsyncStorage", error);
      }
    };

    saveActiveRoute();
  }, [activeRoute]);

  const [iconColor, setIconColor] = useState<string>(
    activeRoute === label ? "white" : "rgba(128,128,128,0.8)",
  );

  useEffect(() => {
    setIconColor(activeRoute === label ? "white" : "rgba(128,128,128,0.8)");
  }, [activeRoute]);

  const tabStyle = useAnimatedStyle(() => {
    const translateY = animatedActiveIndex.value + 30;
    const iconPositionX = iconPosition - index * ICON_SIZE;
    return {
      width: ICON_SIZE,
      height: ICON_SIZE,
      zIndex: 45,
      transform: [
        { translateY: withTiming(translateY) },
        { translateX: iconPositionX - ICON_SIZE / 2 },
      ],
    };
  });

  return (
    <>
      <Animated.View style={[tabStyle]}>
        <Pressable
          testID={`tab${label}`}
          hitSlop={{ top: 30, bottom: 30, left: 50, right: 50 }}
          onPress={onTabPress}
        >
          <Feather name={icon} size={ICON_SIZE} color={iconColor} />
        </Pressable>
      </Animated.View>
    </>
  );
};

export default TabItem;

const styles = StyleSheet.create({
  labelContainer: {
    position: "absolute",
    alignItems: "center",
    width: LABEL_WIDTH,
  },
  label: {
    color: "rgba(128,128,128,0.8",
    fontSize: 17,
  },
});
