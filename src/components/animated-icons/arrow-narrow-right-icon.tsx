"use client";

import { motion, useAnimate } from "motion/react";
import type { AnimatedIconProps } from "./icon-props";

export function ArrowNarrowRightIcon({
  size = 24,
  color = "currentColor",
  strokeWidth = 2,
  className,
  ...props
}: AnimatedIconProps) {
  const [scope, animate] = useAnimate();

  const start = () => {
    animate(".arrow-group", { x: [0, 4, 0] }, { duration: 0.5, ease: "easeInOut" });
  };

  const stop = () => {
    animate(".arrow-group", { x: 0 }, { duration: 0.2, ease: "easeOut" });
  };

  return (
    <motion.svg
      ref={scope}
      onHoverStart={start}
      onHoverEnd={stop}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <motion.g className="arrow-group">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M5 12l14 0" />
        <path d="M15 16l4 -4" />
        <path d="M15 8l4 4" />
      </motion.g>
    </motion.svg>
  );
}
