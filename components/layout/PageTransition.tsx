"use client";

import { motion } from "main"; // veya framer-motion
import { ReactNode } from "react";

// Düzeltme: framer-motion doğru import
import { motion as m } from "framer-motion";

export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {children}
    </m.div>
  );
}