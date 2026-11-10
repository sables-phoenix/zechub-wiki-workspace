"use client";

import { motion, useAnimate } from "motion/react";
import type { AnimatedIconProps } from "./icon-props";

export function SendIcon({
  size = 24,
  color = "currentColor",
  strokeWidth = 2,
  className,
  ...props
}: AnimatedIconProps) {
  const [scope, animate] = useAnimate();

  const start = () => {
    animate(".send-group", { x: [0, 24], y: [0, -24], opacity: [1, 0] }, { duration: 0.25, ease: "easeIn" });
    animate(".send-group", { x: -24, y: 24 }, { duration: 0, delay: 0.25 });
    animate(".send-group", { x: [-24, 0], y: [24, 0], opacity: [0, 1] }, { duration: 0.25, delay: 0.25, ease: "easeOut" });
  };

  const stop = () => {
    animate(".send-group", { x: 0, y: 0, opacity: 1 }, { duration: 0.2, ease: "easeOut" });
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
      style={{ overflow: "visible" }}
      aria-hidden="true"
      {...props}
    >
      <motion.g className="send-group" style={{ transformOrigin: "center" }}>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M10 14l11 -11" />
        <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
      </motion.g>
    </motion.svg>
  );
}
