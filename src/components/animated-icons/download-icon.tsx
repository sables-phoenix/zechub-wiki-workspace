"use client";

import { motion, useAnimate } from "motion/react";
import type { AnimatedIconProps } from "./icon-props";

export function DownloadIcon({
  size = 24,
  color = "currentColor",
  strokeWidth = 2,
  className,
  ...props
}: AnimatedIconProps) {
  const [scope, animate] = useAnimate();

  const start = () => {
    animate(
      ".arrow-head",
      { y: [0, 8, 8, -8, 0], opacity: [1, 0, 0, 0, 1] },
      { duration: 0.9, times: [0, 0.4, 0.5, 0.6, 1], ease: "easeInOut" },
    );
    animate(
      ".arrow-stem",
      { y: [0, 8, 8, -8, 0], opacity: [1, 0, 0, 0, 1] },
      { duration: 0.9, times: [0, 0.3, 0.4, 0.5, 1], ease: "easeInOut" },
    );
    animate(".tray", { y: [0, 2, 0], scale: [1, 1.05, 1] }, { duration: 0.3, delay: 0.3, ease: "easeOut" });
  };

  const stop = () => {
    animate(
      ".arrow-head, .arrow-stem, .tray",
      { y: 0, opacity: 1, scale: 1 },
      { duration: 0.3, ease: "easeOut" },
    );
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
      <motion.path
        className="tray"
        d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
        style={{ transformOrigin: "center bottom" }}
      />
      <motion.path className="arrow-stem" d="M12 15V3" style={{ transformOrigin: "center" }} />
      <motion.path className="arrow-head" d="m7 10 5 5 5-5" style={{ transformOrigin: "center" }} />
    </motion.svg>
  );
}
