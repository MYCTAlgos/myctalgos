"use client";

import { useId } from "react";
import { motion } from "framer-motion";

const BLOB_PATH =
  "M53.6,-58.5C67.4,-45.7,74.6,-25.6,74.9,-5.9C75.2,13.9,68.6,33.3,55.6,47.4C42.6,61.5,23.2,70.3,2.5,68.9C-18.2,67.5,-36.4,55.9,-49.6,41.1C-62.8,26.3,-71,8.3,-70.1,-9.5C-69.2,-27.3,-59.2,-44.9,-44.7,-58.1C-30.2,-71.3,-11.2,-80.1,4.9,-77.8C21,-75.5,39.8,-71.3,53.6,-58.5Z";

type BlobProps = {
  size?: number;
  top?: string;
  left?: string;
  from?: string;
  to?: string;
  opacity?: number;
  duration?: number;
  className?: string;
};

export function Blob({
  size = 420,
  top = "0%",
  left = "0%",
  from = "var(--color-blue-600)",
  to = "var(--color-navy-950)",
  opacity = 0.4,
  duration = 24,
  className = "",
}: BlobProps) {
  const gradientId = useId();

  return (
    <motion.svg
      viewBox="-100 -100 200 200"
      className={`absolute ${className}`}
      style={{ width: size, height: size, top, left, opacity }}
      animate={{ rotate: [0, 14, -10, 0], scale: [1, 1.06, 0.96, 1] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
      </defs>
      <path d={BLOB_PATH} fill={`url(#${gradientId})`} />
    </motion.svg>
  );
}
