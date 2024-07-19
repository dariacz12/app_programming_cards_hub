import { Canvas, Fill, vec } from "@shopify/react-native-skia";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";

import { Ring } from "./Ring";
import Stickers from "./Stickers";

const { width, height } = Dimensions.get("window");
const center = vec(width / 2, height / 2);

export const { PI } = Math;
export const TAU = 2 * PI;
export const SIZE = width;
export const strokeWidth = 40;

const backgroundColor = "#000001";

const color = (r: number, g: number, b: number) =>
  `rgb(${r * 255}, ${g * 255}, ${b * 255})`;

const rings = [
  {
    totalProgress: 1.3,
    colors: [color(0.008, 1, 0.659), color(0, 0.847, 1)],
    background: color(0.016, 0.227, 0.212),
    size: SIZE - strokeWidth * 4,
    name: "React",
  },
  {
    totalProgress: 0.6,
    colors: [color(0.847, 1, 0), color(0.6, 1, 0.004), color(0, 0.847, 1)],
    background: color(0.133, 0.2, 0),
    size: SIZE - strokeWidth * 2,
    name: "JavaScript",
  },
  {
    totalProgress: 0.7,
    colors: [
      color(0.98, 0.067, 0.31),
      color(0.976, 0.22, 0.522),
      color(0, 0.847, 1),
    ],
    background: color(0.196, 0.012, 0.063),
    size: SIZE,
    name: "CSS",
  },
];
const fgRadius = rings[0].size / 2 - strokeWidth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    transform: [{ rotate: "-270deg" }],
  },
  fg: {
    backgroundColor,
    borderRadius: fgRadius,
    width: fgRadius * 2,
    height: fgRadius * 2,
  },
});

export const Rings = () => {
  console.log(rings);
  return (
    <Canvas style={{ flex: 1 }}>
      <Fill color="black" />
      {rings.map((ring, index) => {
        return (
          <Ring
            key={index}
            ring={ring}
            center={center}
            strokeWidth={strokeWidth}
          />
        );
      })}
    </Canvas>
  );
};
