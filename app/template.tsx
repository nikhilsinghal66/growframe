"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export default function Template({ children }: { children: ReactNode }) {
  const shouldReduceMotion = useReducedMotion();

  const pageTransitionVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 12,
      scale: shouldReduceMotion ? 1 : 0.99,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.72,
        ease: [0.16, 1, 0.3, 1] as const, // Ultra-soft cinematic easeOut (exponential)
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={pageTransitionVariants}
      className="w-full flex-1 flex flex-col"
    >
      {/* Premium Top Navigation Progress Bar */}
      {!shouldReduceMotion && (
        <motion.div
          initial={{ width: "0%", opacity: 1 }}
          animate={{ width: "100%", opacity: [1, 1, 0] }}
          transition={{
            width: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
            opacity: { times: [0, 0.8, 1], duration: 0.8, ease: "easeOut" },
          }}
          className="fixed top-0 left-0 right-0 z-[100] h-[2.5px] bg-gradient-to-r from-[#7C3AED] via-[#A78BFA] to-[#7C3AED] shadow-[0_0_12px_rgba(124,58,237,0.5),0_0_4px_rgba(167,139,250,0.3)]"
        />
      )}
      {children}
    </motion.div>
  );
}
