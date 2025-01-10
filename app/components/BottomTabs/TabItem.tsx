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

export type TabProps = {
  label: string;
  icon: string;
  index: number;
  activeIndex: number;
  onTabPress: () => void;
  activeRoute: string;
};
const ICON_SIZE = 25;
const LABEL_WIDTH = SCREEN_WIDTH / 4;
const AnimatedIcon = Animated.createAnimatedComponent(Feather);
const TabItem: FC<TabProps> = ({
  label,
  icon,
  index,
  activeIndex,
  activeRoute,

  onTabPress,
}) => {
  const { curvedPaths } = usePath();
  const animatedActiveIndex = useSharedValue(activeIndex);
  const iconPosition = getPathXCenterByIndex(curvedPaths, index);
  const labelPosition = getPathXCenterByIndex(curvedPaths, index);

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

  const [iconColor, setIconColor] = useState(
    activeRoute === label ? "white" : "rgba(128,128,128,0.8)",
  );

  useEffect(() => {
    setIconColor(activeRoute === label ? "white" : "rgba(128,128,128,0.8)");
  }, [activeRoute]);

  const animatedIconProps = useAnimatedProps(() => ({
    color: iconColor,
  }));
  return (
    <>
      <Animated.View style={[tabStyle]}>
        <Pressable
          testID={`tab${label}`}
          //Increasing touchable Area
          hitSlop={{ top: 30, bottom: 30, left: 50, right: 50 }}
          onPress={onTabPress}
        >
          <AnimatedIcon
            name={icon}
            size={25}
            animatedProps={animatedIconProps}
          />
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
