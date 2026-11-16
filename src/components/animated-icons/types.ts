import type { AnimatedIconProps } from "./icon-props";

export type { AnimatedIconProps };

export type AnimatedIconHandle = {
  startAnimation: () => void;
  stopAnimation: () => void;
};

export const scaledStrokeWidth = (strokeWidth: number, viewBoxSize: number): number =>
  (strokeWidth * 24) / viewBoxSize;
