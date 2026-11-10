"use client";

import { motion, useAnimate } from "motion/react";
import type { AnimatedIconProps } from "./icon-props";

export function WalletIcon({
  size = 24,
  color = "currentColor",
  strokeWidth = 2,
  className,
  ...props
}: AnimatedIconProps) {
  const [scope, animate] = useAnimate();

  const start = () => {
    animate(".flap", { rotateY: 25, x: 2 }, { duration: 0.4, ease: "easeOut" });
    animate(".wallet-body", { scale: 1.05 }, { duration: 0.4, ease: "easeOut" });
  };

  const stop = () => {
    animate(".flap", { rotateY: 0, x: 0 }, { duration: 0.4, ease: "easeIn" });
    animate(".wallet-body", { scale: 1 }, { duration: 0.4, ease: "easeIn" });
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
      style={{ perspective: "400px" }}
      aria-hidden="true"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <motion.path
        className="wallet-body"
        d="M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12"
      />
      <motion.path
        className="flap"
        d="M20 12v4h-4a2 2 0 0 1 0 -4h4"
        style={{ originX: "50%", originY: "50%", transformStyle: "preserve-3d" }}
      />
    </motion.svg>
  );
}
