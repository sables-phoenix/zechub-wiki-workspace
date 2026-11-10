"use client";

import { motion, useAnimate } from "motion/react";
import type { AnimatedIconProps } from "./icon-props";

export function SunIcon({
  size = 24,
  color = "currentColor",
  strokeWidth = 2,
  className,
  ...props
}: AnimatedIconProps) {
  const [scope, animate] = useAnimate();

  const start = () => {
    animate(".sun-center", { scale: [1, 0.8, 1] }, { duration: 0.4, ease: "easeInOut" });
    animate(".sun-rays", { opacity: [1, 0.4, 1] }, { duration: 0.5, ease: "easeInOut" });
  };

  const stop = () => {
    animate(".sun-center", { scale: 1 }, { duration: 0.2, ease: "easeOut" });
    animate(".sun-rays", { opacity: 1 }, { duration: 0.2, ease: "easeOut" });
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
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <motion.path
        className="sun-center"
        d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"
        style={{ transformOrigin: "center" }}
      />
      <motion.g className="sun-rays">
        <path d="M12 5l0 .01" />
        <path d="M17 7l0 .01" />
        <path d="M19 12l0 .01" />
        <path d="M17 17l0 .01" />
        <path d="M12 19l0 .01" />
        <path d="M7 17l0 .01" />
        <path d="M5 12l0 .01" />
        <path d="M7 7l0 .01" />
      </motion.g>
    </motion.svg>
  );
}
